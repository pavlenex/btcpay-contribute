import type { Issue, FilterState } from '@/types'

export function filterIssues(issues: Issue[], filters: FilterState): Issue[] {
  let result = issues.filter((i) => i.assignees.length === 0)

  if (filters.query.trim()) {
    const q = filters.query.trim().toLowerCase()
    result = result.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.body.toLowerCase().includes(q) ||
        i.repo.name.toLowerCase().includes(q),
    )
  }

  return result.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}
