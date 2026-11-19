import { cv, github, linkedin, profileCopy, profileOrigin, talkUrls } from './public-profile';

export function profileMarkdown(locale: keyof typeof profileCopy) {
  const copy = profileCopy[locale];
  const link = (label: string, href: string) => `[${label}](${new URL(href, profileOrigin).href})`;
  const section = (title: string, ...items: string[]) => [`## ${title}`, ...items].join('\n\n');
  const item = (title: string, ...paragraphs: string[]) => [`### ${title}`, ...paragraphs].join('\n\n');
  const bulletList = (items: string[]) => items.map(text => `- ${text}`).join('\n');

  return [
    `# ${copy.name}`,
    copy.headline,
    ...copy.lead,
    section(copy.focus.title, copy.focus.intro, ...copy.focus.items.map(entry => item(entry.title, entry.text))),
    section(copy.ai.title, copy.ai.intro, ...copy.ai.items.map(entry =>
      item(entry.href ? link(entry.title, entry.href) : entry.title, entry.text))),
    section(copy.experience.title, ...copy.experience.roles.map(role =>
      item(`${role.company} · ${role.title}`, role.period, role.summary, bulletList(role.items)))),
    section(copy.projects.title, copy.projects.intro, ...copy.projects.items.map(entry => item(entry.title, entry.text))),
    section(copy.skills.title, ...copy.skills.items.map(entry => item(entry.title, entry.text))),
    section(copy.education.title, ...copy.education.items.map(entry => item(entry.title,
      [entry.institution, entry.period, entry.detail].filter(Boolean).join(' · '), entry.description,
      ...(entry.publication ? [link(entry.publication.label, entry.publication.href)] : [])))),
    section(copy.languages.title, bulletList(copy.languages.items.map(entry => entry.text))),
    section(copy.about.title, `> ${copy.about.quote}`, ...copy.about.items),
    section(copy.talks.title,
      item(copy.talks.highlights[0].title, copy.talks.highlights[0].text),
      item(copy.talks.heading, bulletList(copy.talks.labels.map((label, index) => link(label, talkUrls[index])))),
      item(copy.talks.highlights[1].title, copy.talks.highlights[1].text)),
    section(copy.contact.title, copy.contact.text, copy.contact.note,
      bulletList([link(copy.contact.linkedin, linkedin), link('GitHub', github),
        link('CV (ES)', cv.es), link('CV (EN)', cv.en)])),
  ].join('\n\n') + '\n';
}
