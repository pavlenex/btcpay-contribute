// @ts-check

/**
 * Maps a GitHub issue + repo to skill categories.
 *
 * Rules (an issue can match multiple skills):
 *   writer    — repo is btcpayserver-doc  OR  label is docs/writing/translation
 *   design    — label is design/ui/ux
 *   marketing — label is marketing/community/growth/seo
 *   developer — default when none of the above match
 *
 * Mirrors src/lib/skill-map.ts — keep both in sync.
 */

const WRITER_REPOS     = new Set(['btcpayserver-doc'])
const WRITER_LABELS    = new Set(['writing', 'documentation', 'docs', 'translation', 'content writing'])
const DESIGN_LABELS    = new Set(['design', 'ui', 'ux', 'ui/ux'])
const MARKETING_LABELS = new Set(['marketing', 'community', 'growth', 'seo'])

/**
 * @param {{ labels: { name: string }[] }} issue
 * @param {{ name: string, language: string | null }} repo
 * @returns {{ skills: string[], tags: string[] }}
 */
export function mapSkills(issue, repo) {
  const labelNames = issue.labels.map((l) => l.name.toLowerCase())

  const isWriter    = WRITER_REPOS.has(repo.name) || labelNames.some((l) => WRITER_LABELS.has(l))
  const isDesign    = labelNames.some((l) => DESIGN_LABELS.has(l))
  const isMarketing = labelNames.some((l) => MARKETING_LABELS.has(l))

  /** @type {string[]} */
  const skills = []
  if (isWriter)    skills.push('writer')
  if (isDesign)    skills.push('design')
  if (isMarketing) skills.push('marketing')
  if (skills.length === 0) skills.push('developer')  // default

  // Tags: repo language for developer issues
  /** @type {string[]} */
  const tags = []
  if (skills.includes('developer') && repo.language) tags.push(repo.language)
  if (isWriter)    tags.push('docs')
  if (isDesign)    tags.push('design')
  if (isMarketing) tags.push('marketing')

  return { skills, tags }
}
