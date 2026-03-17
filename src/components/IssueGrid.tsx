import { useState } from 'react'
import type React from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import IssueCard from '@/components/IssueCard'
import type { Issue } from '@/types'

const PAGE_SIZE = 20

interface IssueGridProps {
  issues: Issue[]
  loading?: boolean
  onIssueClick: (e: React.MouseEvent, issue: Issue) => void
  onIssueHover: () => void
}

export default function IssueGrid({ issues, loading, onIssueClick, onIssueHover }: IssueGridProps) {
  const [page, setPage] = useState(1)

  const visible = issues.slice(0, page * PAGE_SIZE)
  const hasMore = visible.length < issues.length

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        <Loader2 size={24} className="animate-spin mr-2" />
        Loading issues…
      </div>
    )
  }

  if (issues.length === 0) {
    return (
      <div id="issues" className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-4xl mb-3">🔍</p>
        <h3 className="font-display font-semibold text-lg">No issues found</h3>
        <p className="text-muted-foreground text-sm mt-1">
          Try adjusting your filters or search query.
        </p>
      </div>
    )
  }

  return (
    <div id="issues" className="mt-4 mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((issue, i) => (
          <div key={issue.id} className={`card-enter card-enter-${Math.min(i + 1, 6)}`} onMouseEnter={onIssueHover}>
              <IssueCard issue={issue} onClick={onIssueClick} />
            </div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button variant="outline" onClick={() => setPage((p) => p + 1)}>
            Load more ({issues.length - visible.length} remaining)
          </Button>
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground mt-4">
        Showing {visible.length} of {issues.length} issues
      </p>
    </div>
  )
}
