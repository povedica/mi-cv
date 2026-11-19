#!/usr/bin/env bash
set -euo pipefail

if [[ $# != 2 || ! -f $1 || -e $2 || -L $2 ]]; then
  echo "Usage: $0 INPUT_MP4 NEW_OUTPUT_DIRECTORY" >&2
  exit 2
fi

input="$(cd -- "$(dirname -- "$1")" && pwd -P)/$(basename -- "$1")"
duration="$(ffprobe -v error -select_streams v:0 -show_entries stream=duration -of csv=p=0 "$input")"
if [[ ! $duration =~ ^[0-9]+([.][0-9]+)?$ ]]; then
  echo "Input MP4 must report its video duration." >&2
  exit 2
fi
output=$2
parent="$(cd -- "$(dirname -- "$output")" && pwd -P)"
staging="$(mktemp -d "$parent/.avatar-hls.XXXXXXXX")"
trap 'rm -rf -- "$staging"' EXIT

(
  cd "$staging"
  for rendition in 1080p 720p 480p; do
    mkdir "$rendition"
  done
  ffmpeg -hide_banner -nostdin -i "$input" \
    -map 0:v:0 -map 0:a:0 -map 0:v:0 -map 0:a:0 -map 0:v:0 -map 0:a:0 \
    -filter:v:0 'scale=w=if(gte(iw\,ih)\,-2\,1080):h=if(gte(iw\,ih)\,1080\,-2),setsar=1' \
    -filter:v:1 'scale=w=if(gte(iw\,ih)\,-2\,720):h=if(gte(iw\,ih)\,720\,-2),setsar=1' \
    -filter:v:2 'scale=w=if(gte(iw\,ih)\,-2\,480):h=if(gte(iw\,ih)\,480\,-2),setsar=1' \
    -c:v libx264 -preset fast -pix_fmt yuv420p -flags +cgop -sc_threshold 0 -bf 0 \
    -force_key_frames 'expr:gte(t,n_forced*4)' \
    -b:v:0 3500k -maxrate:v:0 4200k -bufsize:v:0 8400k \
    -b:v:1 2000k -maxrate:v:1 2400k -bufsize:v:1 4800k \
    -b:v:2 800k -maxrate:v:2 960k -bufsize:v:2 1920k \
    -af "apad=whole_dur=$duration,atrim=duration=$duration" -c:a aac -b:a 128k -ac 2 \
    -f hls -hls_time 4 -hls_playlist_type vod -hls_flags independent_segments \
    -hls_segment_type fmp4 -hls_fmp4_init_filename init.mp4 \
    -master_pl_name master.m3u8 -hls_segment_filename '%v/%05d.m4s' \
    -var_stream_map 'v:0,a:0,name:1080p v:1,a:1,name:720p v:2,a:2,name:480p' \
    '%v/index.m3u8'
)
chmod 755 "$staging"
mv -- "$staging" "$output"
