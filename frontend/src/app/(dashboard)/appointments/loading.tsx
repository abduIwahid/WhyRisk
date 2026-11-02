import { PageTitleSkeleton, FilterChipsSkeleton, ListSkeleton } from "@/components/shared/Skeletons"

export default function AppointmentsLoading() {
  return (
    <div className="space-y-6 lg:space-y-8 2xl:space-y-10" aria-busy="true" aria-label="Loading appointments">
      <PageTitleSkeleton />
      <FilterChipsSkeleton />
      <ListSkeleton rows={5} />
    </div>
  )
}
