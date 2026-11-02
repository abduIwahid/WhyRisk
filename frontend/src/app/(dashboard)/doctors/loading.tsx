import { PageTitleSkeleton, ListSkeleton } from "@/components/shared/Skeletons"

export default function DoctorsLoading() {
  return (
    <div className="space-y-6 lg:space-y-8 2xl:space-y-10" aria-busy="true" aria-label="Loading doctors">
      <PageTitleSkeleton />
      <ListSkeleton rows={5} tall />
    </div>
  )
}
