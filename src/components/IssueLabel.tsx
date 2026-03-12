import type { IssueLabel as IssueLabelType } from '@/types'

/** Shared GitHub-style label chip used in IssueCard and IssueModal. */
export default function IssueLabel({ label }: { label: IssueLabelType }) {
  // Validate hex color from GitHub API before using in inline styles
  const hex = /^[0-9a-f]{6}$/i.test(label.color) ? label.color : '888888'
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium"
      style={{
        backgroundColor: `#${hex}22`,
        color:           `#${hex}`,
        border:          `1px solid #${hex}44`,
      }}
    >
      {label.name}
    </span>
  )
}
