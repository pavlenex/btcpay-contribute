import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import FilterBar from '@/components/FilterBar'
import IssueGrid from '@/components/IssueGrid'
import IssueModal from '@/components/IssueModal'
import ResourcesSection from '@/components/ResourcesSection'
import Footer from '@/components/Footer'
import { useFilters } from '@/hooks/useFilters'
import { useIssues } from '@/hooks/useIssues'
import type { Issue } from '@/types'

export default function App() {
  const { filters, setSkill, setQuery, clearAll } = useFilters()
  const { filtered, status } = useIssues(filters)
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null)

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-[4.5rem] pb-8">
        <Hero />

        <div id="issues" className="border-t border-border/60 pt-20 sm:pt-28 pb-10 text-center">
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground">
            Pick an issue
          </h2>
          <p className="mt-4 text-muted-foreground max-w-sm mx-auto text-sm sm:text-base">
            Filter by skill and find something that excites you.
          </p>
        </div>

        <div className="sticky top-14 z-40 py-3 -mx-4 sm:-mx-6 px-4 sm:px-6 bg-background/85 backdrop-blur-xl">
          <FilterBar
            filters={filters}
            setSkill={setSkill}
            setQuery={setQuery}
            clearAll={clearAll}
          />
        </div>

        <IssueGrid
          issues={filtered}
          loading={status === 'loading'}
          onIssueClick={setSelectedIssue}
        />

        <ResourcesSection />
      </main>

      <Footer />

      <IssueModal
        issue={selectedIssue}
        onClose={() => setSelectedIssue(null)}
      />
    </>
  )
}
