import { PageTitleSkeleton, FilterChipsSkeleton, TableSkeleton } from "@/components/shared/Skeletons"

export default function PatientsLoading() {
  return (
    <div className="space-y-6 lg:space-y-8 2xl:space-y-10" aria-busy="true" aria-label="Loading patients">
      <PageTitleSkeleton wide />
      <FilterChipsSkeleton />
      <TableSkeleton rows={8} />
    </div>
  )
}
