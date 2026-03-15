import type { Issue, FilterState, SkillCategory } from '@/types'
import { ALL_SKILLS } from '@/lib/skill-map'

const ALLOWED_SKILLS = new Set<string>(ALL_SKILLS)

/** Loose input accepted by sanitizeFilters — raw strings from URL params before validation. */
interface RawFilterInput {
  skill?: string | null
  tags?: string[]
  repos?: string[]
  query?: string
}

/** Sanitize raw URL-param input — only valid, allowlisted values pass through. */
export function sanitizeFilters(raw: RawFilterInput): FilterState {
  return {
    skill: raw.skill && ALLOWED_SKILLS.has(raw.skill) ? (raw.skill as SkillCategory) : null,
    tags: Array.isArray(raw.tags) ? raw.tags.filter((t) => /^[\w/. -]+$/.test(t)) : [],
    repos: Array.isArray(raw.repos) ? raw.repos.filter((r) => /^[\w.-]+$/.test(r)) : [],
    query: typeof raw.query === 'string' ? raw.query.slice(0, 200) : '',
  }
}

/** Apply all active filters to the full issue list */
export function filterIssues(issues: Issue[], filters: FilterState): Issue[] {
  let result = issues.filter((i) => i.assignees.length === 0)

  if (filters.skill) {
    result = result.filter((i) => i.skills.includes(filters.skill!))
  }

  if (filters.tags.length > 0) {
    result = result.filter((i) => filters.tags.every((tag) => i.tags.includes(tag)))
  }

  if (filters.repos.length > 0) {
    result = result.filter((i) => filters.repos.includes(i.repo.name))
  }

  if (filters.query.trim()) {
    const q = filters.query.trim().toLowerCase()
    result = result.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.body.toLowerCase().includes(q) ||
        i.repo.name.toLowerCase().includes(q),
    )
  }

  return result
}

export function hasActiveFilters(filters: FilterState): boolean {
  return !!(filters.skill || filters.tags.length || filters.repos.length || filters.query.trim())
}
