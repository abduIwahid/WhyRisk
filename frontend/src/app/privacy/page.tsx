import type { Metadata } from "next"
import LegalPage, { LegalSection, LegalList } from "@/components/shared/LegalPage"

export const metadata: Metadata = {
  title: "Privacy Policy — WhyRisk",
  description:
    "What information WhyRisk handles, why, and what choices you have. WhyRisk is an experimental clinical decision-support and research tool.",
}

/**
 * Public Privacy Policy (approved draft, 2026-10-30 —
 * ~/workspace/whyrisk-qa/privacy-terms-draft.md). Copy ships as
 * approved; the retention wording comes from the draft's own
 * decisions note (no concrete period was set).
 */
export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Privacy" title="Privacy Policy">
      <p className="mt-6 max-w-[70ch] text-[15px] leading-relaxed text-muted-foreground">
        WhyRisk is an experimental clinical decision-support and research tool. This policy explains what
        information the platform handles, why, and what choices you have. It is written in plain language on
        purpose.
      </p>

      <LegalSection title="Who operates WhyRisk">
        <p>
          WhyRisk is operated by its maintainer (&ldquo;we&rdquo;, &ldquo;us&rdquo;). Questions about this policy
          or your information:{" "}
          <a href="mailto:contact@abdulwahid.me" className="font-medium text-primary hover:underline">
            contact@abdulwahid.me
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="What we collect">
        <LegalList
          items={[
            <>
              <strong className="font-semibold text-foreground">Account information.</strong> When you create an
              account we store your name, email address, role (patient, doctor, or other staff), and — depending
              on role — professional details you provide (for doctors: speciality, licence number, qualifications)
              or profile details (for patients: phone number, gender, date of birth).
            </>,
            <>
              <strong className="font-semibold text-foreground">Clinical information.</strong> Care teams record
              patient information in the platform: demographics, vital signs, laboratory results, diagnoses, and
              related notes. This information is entered by your care team, not collected from your device.
            </>,
            <>
              <strong className="font-semibold text-foreground">Risk assessments.</strong> When a clinician runs
              the prediction model, the platform stores the input values used, the resulting risk score, the
              model&apos;s explanation of that score, and the model version.
            </>,
            <>
              <strong className="font-semibold text-foreground">Appointments.</strong> Booking an appointment
              stores the patient, the doctor, the time, and the reason given.
            </>,
            <>
              <strong className="font-semibold text-foreground">Messages you send us.</strong> If you use a contact
              form, we receive your name, email address, and message.
            </>,
            <>
              <strong className="font-semibold text-foreground">Assistant conversations.</strong> The in-app AI
              assistant processes the text you type (and, for doctors, the patient context shown in the app) to
              generate a reply. Conversations are not used to train the risk model.
            </>,
          ]}
        />
      </LegalSection>

      <LegalSection title="How we use it">
        <LegalList
          items={[
            "To run the service: showing records to the care team treating the patient, generating risk estimates and explanations, managing appointments and alerts.",
            "To keep the service safe: access is role-based. Patients can see only their own information; clinicians can see the information of patients in their care.",
            "To reply to messages you send us.",
          ]}
        />
        <p>We do not sell personal information, and we do not use clinical information for advertising.</p>
      </LegalSection>

      <LegalSection title="The risk model">
        <p>
          Risk scores are statistical estimates produced by a machine-learning model trained on the CDC BRFSS
          2015 survey dataset (70,692 records). A score is an educational and decision-support aid. It is{" "}
          <strong className="font-semibold text-foreground">not a diagnosis</strong>, and it does not replace a
          clinician&apos;s judgement.
        </p>
        <p>
          The public quick check on the home page runs the same model. Answers given there are sent to the model
          service to compute the estimate and are{" "}
          <strong className="font-semibold text-foreground">not stored</strong> and are not linked to any account.
        </p>
      </LegalSection>

      <LegalSection title="Who processes data for us">
        <p>
          We use a small number of infrastructure providers to run the service: hosting and database (Vercel and
          Supabase) and email delivery (Resend) store and transmit the data described above, and the AI assistant
          is powered by Google&apos;s Gemini models, which receive the text needed to answer. These providers
          process data on our behalf; we do not grant them any right to use it for their own purposes.
        </p>
      </LegalSection>

      <LegalSection title="Demonstration data">
        <p>
          The platform may contain clearly labelled demonstration records (names and values marked as demo data)
          used to show how the system works. Demonstration records are not real patients.
        </p>
      </LegalSection>

      <LegalSection title="Security">
        <p>
          Accounts are protected by passwords and role-based access controls, and data moves over encrypted
          connections. No system is perfectly secure; if we become aware of a breach affecting your information,
          we will tell you.
        </p>
      </LegalSection>

      <LegalSection title="How long we keep it">
        <p>
          Records are kept for as long as the account or care relationship exists. Demonstration data can be
          removed at any time.
        </p>
      </LegalSection>

      <LegalSection title="Your choices">
        <LegalList
          items={[
            "You can review the information on your profile in the app.",
            <>
              You can ask us to correct or delete your account and associated information by writing to{" "}
              <a href="mailto:contact@abdulwahid.me" className="font-medium text-primary hover:underline">
                contact@abdulwahid.me
              </a>
              . Clinical records that form part of a care record may need to be retained where the care provider
              is required to keep them.
            </>,
            "If you are a patient and believe information in your record is wrong, tell your care team or contact us.",
          ]}
        />
      </LegalSection>

      <LegalSection title="Changes">
        <p>If this policy changes materially, we will update this page and the date at the top.</p>
      </LegalSection>
    </LegalPage>
  )
}
