/** Shared layout for text pages (FAQ, Privacy, Terms). */
export default function InfoPage({ eyebrow, title, intro, children }) {
  return (
    <div className="bg-background">
      <div className="max-w-[820px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {eyebrow && <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold block mb-2">{eyebrow}</span>}
        <h1 className="font-headline-lg text-[28px] md:text-headline-lg text-on-surface">{title}</h1>
        {intro && <p className="text-on-surface-variant mt-3">{intro}</p>}
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
