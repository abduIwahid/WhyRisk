import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { ProfileForm } from "@/components/shared/ProfileForm"
import { ChangePasswordCard } from "@/components/shared/ChangePasswordCard"
import { SlideIn } from "@/components/shared/SlideIn"
import { getCurrentProfile, getCurrentUser } from "@/lib/current-profile"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get(name: string) { return cookieStore.get(name)?.value } } }
  )

  const user = await getCurrentUser()
  if (!user) redirect("/login")

  const profile = await getCurrentProfile()

  // A signed-in user with NO profile row is an error here, not a blank
  // form (QA Round 3, states F-09): genuinely new accounts are routed
  // through onboarding, so rendering the form with empty fields would
  // invite the user to overwrite their real record with blanks.
  if (!profile) {
    return (
      <div className="space-y-6 lg:space-y-8 2xl:space-y-10 max-w-3xl">
        <SlideIn direction="left">
          <div>
            <h1 className="text-2xl sm:text-3xl 2xl:text-4xl font-bold tracking-tight">Profile & Settings</h1>
          </div>
        </SlideIn>
        <SlideIn direction="up">
          <div role="alert" className="rounded-xl border border-destructive/30 bg-destructive/10 p-6 text-sm text-destructive-text">
            Your profile could not be loaded. Please reload the page to try again — if it keeps happening, contact an administrator.
          </div>
        </SlideIn>
      </div>
    )
  }

  // Only the assigned hospital's NAME crosses into the form — the form
  // no longer offers a hospital picker (assignment is admin-only, QA
  // Round 2, cluster 12), it just displays where the user belongs. One
  // targeted lookup, with its error kept distinct from "Unassigned"
  // (QA Round 3, profile L4): a failed lookup must not tell an assigned
  // user they have no hospital.
  let hospitalName: string | null = null
  let hospitalLookupFailed = false
  if (profile.hospital_id) {
    const { data: hospital, error: hospitalError } = await supabase
      .from('hospitals')
      .select('name')
      .eq('id', profile.hospital_id)
      .single()
    if (hospitalError) {
      console.error("Hospital lookup failed:", hospitalError)
      hospitalLookupFailed = true
    } else {
      hospitalName = hospital?.name ?? null
    }
  }

  return (
    <div className="space-y-6 lg:space-y-8 2xl:space-y-10 max-w-3xl">
      <SlideIn direction="left">
        <div>
          <h1 className="text-2xl sm:text-3xl 2xl:text-4xl font-bold tracking-tight">Profile & Settings</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Manage your account details and profile information. Your role is shown for reference — it is assigned by an admin.
          </p>
        </div>
      </SlideIn>
      <SlideIn direction="up">
        <div className="bg-card border rounded-xl p-6 shadow-card">
          <ProfileForm
            user={user}
            profile={profile}
            hospitalName={hospitalLookupFailed ? "Couldn't load — refresh to retry" : hospitalName}
          />
        </div>
      </SlideIn>
      {user.email && (
        <SlideIn direction="up" delay={0.08}>
          <ChangePasswordCard email={user.email} />
        </SlideIn>
      )}
    </div>
  )
}
