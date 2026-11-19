#!/usr/bin/env bash
# Regenera index.html (tema automático claro/oscuro) a partir de template.html
cd "$(dirname "$0")"
sed 's/ class="{{THEME}}"//' template.html > index.html
