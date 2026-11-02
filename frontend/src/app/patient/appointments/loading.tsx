import { PageTitleSkeleton, ListSkeleton } from "@/components/shared/Skeletons"

export default function PatientAppointmentsLoading() {
  return (
    <div className="space-y-6 lg:space-y-8 2xl:space-y-10" aria-busy="true" aria-label="Loading your appointments">
      <PageTitleSkeleton />
      <ListSkeleton rows={4} />
    </div>
  )
}
