import { PatientChatPanel } from "@/components/shared/PatientChatPanel"

export default function PatientAssistantPage() {
  return (
    <div className="space-y-6 lg:space-y-8 2xl:space-y-10 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl 2xl:text-4xl font-bold tracking-tight">AI Assistant</h1>
        <p className="text-muted-foreground">Describe your symptoms and get pointed to the right specialist.</p>
      </div>
      <PatientChatPanel />
    </div>
  )
}
