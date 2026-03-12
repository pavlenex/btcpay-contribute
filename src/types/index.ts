export type SkillCategory = 'developer' | 'writer' | 'design' | 'marketing'

export interface Repository {
  id: number
  name: string
  fullName: string
  description: string | null
  url: string
  language: string | null
  topics: string[]
  stars: number
}

export interface IssueLabel {
  name: string
  color: string // hex without #
}

export interface IssueAuthor {
  login: string
  avatarUrl: string
  url: string
}

export interface Issue {
  id: number
  number: number
  title: string
  body: string // truncated to 600 chars
  url: string
  createdAt: string
  updatedAt: string
  commentsCount: number
  reactionCount: number
  labels: IssueLabel[]
  repo: Pick<Repository, 'name' | 'fullName' | 'language' | 'url'>
  assignees: IssueAuthor[]
  author: IssueAuthor
  skills: SkillCategory[]
  tags: string[]
}

export interface IssuesData {
  lastUpdated: string
  totalIssues: number
  repoCount: number
  repos: Repository[]
  issues: Issue[]
}

export interface FilterState {
  skill: SkillCategory | null
  tags: string[]
  repos: string[]
  query: string
}
