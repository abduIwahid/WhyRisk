import { PageTitleSkeleton, FilterChipsSkeleton, ListSkeleton } from "@/components/shared/Skeletons"

export default function AlertsLoading() {
  return (
    <div className="space-y-6 lg:space-y-8 2xl:space-y-10" aria-busy="true" aria-label="Loading alerts">
      <PageTitleSkeleton />
      <FilterChipsSkeleton count={4} />
      <ListSkeleton rows={6} />
    </div>
  )
}
