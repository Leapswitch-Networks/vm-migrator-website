interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  center?: boolean;
}

export default function SectionHeading({ badge, title, description, center = true }: SectionHeadingProps) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {badge && (
        <div className={`mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary ${center ? "" : ""}`}>
          {badge}
        </div>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-text-secondary sm:text-xl">
          {description}
        </p>
      )}
    </div>
  );
}
