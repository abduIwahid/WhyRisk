import type { Metadata } from "next"
import LegalPage, { LegalSection, LegalList } from "@/components/shared/LegalPage"

export const metadata: Metadata = {
  title: "Terms of Use: WhyRisk",
  description:
    "The terms for using WhyRisk, an experimental clinical decision-support and research tool. It is not a certified medical device.",
}

/**
 * Public Terms of Use (approved draft, 2026-10-30 —
 * ~/workspace/whyrisk-qa/privacy-terms-draft.md). Copy ships as
 * approved; the patient-portal age line in section 2 comes from the
 * draft's own decisions note.
 */
export default function TermsPage() {
  return (
    <LegalPage eyebrow="Terms" title="Terms of Use">
      <LegalSection title="1. What WhyRisk is">
        <p>
          WhyRisk is an experimental clinical decision-support and research tool. It is{" "}
          <strong className="font-semibold text-foreground">not a certified medical device</strong>, and nothing
          on this platform, including any risk score, explanation, or assistant reply, is a diagnosis or a
          substitute for professional medical judgement.
        </p>
      </LegalSection>

      <LegalSection title="2. Accounts">
        <p>
          You are responsible for your account and for keeping your password confidential. Information you
          provide at signup must be accurate. The patient portal is intended for adults (18 years or older), or
          for patients registered by their care team. Doctor accounts may require approval and verification of
          professional details before clinical features are enabled; we may decline or revoke approval.
        </p>
      </LegalSection>

      <LegalSection title="3. Acceptable use">
        <LegalList
          items={[
            "Patients may use the portal for their own appointments, profile, and risk information.",
            "Clinicians may access only the records of patients in their care and may use the tools only in that context.",
            "You must not attempt to access another person's information, probe or overload the service, or use the platform for any unlawful purpose.",
          ]}
        />
      </LegalSection>

      <LegalSection title="4. Risk scores and the assistant">
        <p>
          Risk scores are estimates from a statistical model and can be wrong in either direction. Clinical
          decisions remain the responsibility of the treating clinician. The AI assistant can make mistakes;
          verify anything important through your care team or official guidance. If you are experiencing a
          medical emergency, contact local emergency services, do not rely on this platform.
        </p>
      </LegalSection>

      <LegalSection title="5. Availability">
        <p>
          The service is provided &ldquo;as is&rdquo;, without warranties. As an experimental tool it may change,
          break, or be unavailable, and features may be added or removed without notice.
        </p>
      </LegalSection>

      <LegalSection title="6. Liability">
        <p>
          To the extent permitted by law, the operator is not liable for decisions taken in reliance on the
          platform&apos;s estimates or content.
        </p>
      </LegalSection>

      <LegalSection title="7. Governing law">
        <p>These terms are governed by the laws of Pakistan.</p>
      </LegalSection>

      <LegalSection title="8. Contact">
        <p>
          Questions about these terms:{" "}
          <a href="mailto:contact@abdulwahid.me" className="font-medium text-primary hover:underline">
            contact@abdulwahid.me
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  )
}
