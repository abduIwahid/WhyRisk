import Image from "next/image"

/**
 * Shared auth photo backdrop (Step B, 2026-11-02): the stethoscope
 * photograph (Unsplash) as a blurred atmospheric background layer under
 * a heavy tint — never a framed picture. The auth pages do not share a
 * panel shell (login has its own navy brand panel; signup / forgot /
 * update-password are centred cards), so each page mounts this layer
 * inside its own root/panel and keeps its content above it.
 *
 * `tintClassName` picks the tint: the navy `bg-primary/85` inside the
 * login brand panel, the paper `bg-background/90` behind the card
 * pages — in both cases the photo stays a faint texture and every
 * label, feature line and form control renders crisp above it.
 */
export function AuthPhotoBackdrop({
  tintClassName = "bg-background/90",
}: {
  tintClassName?: string
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1655913197692-012897652d13?fm=jpg&q=80&w=1600&auto=format&fit=crop"
        alt="A stethoscope resting on a light blue surface"
        fill
        sizes="(min-width: 1024px) 640px, 100vw"
        className="scale-[1.06] object-cover blur-[3px]"
      />
      <div aria-hidden="true" className={`absolute inset-0 ${tintClassName}`} />
    </div>
  )
}
