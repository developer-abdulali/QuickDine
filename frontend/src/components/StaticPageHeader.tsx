import type { ReactNode } from "react";

interface StaticPageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  children?: ReactNode;
}

export default function StaticPageHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: StaticPageHeaderProps) {
  return (
    <section className="bg-surface-container-low border-b border-outline-variant/20">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20 text-left">
        {eyebrow && (
          <p className="text-[10px] font-medium tracking-widest uppercase text-secondary mb-3">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-3xl md:text-5xl font-medium text-primary tracking-tight">
          {title}
        </h1>
        <p className="text-black/55 text-base leading-relaxed max-w-2xl mt-4">
          {subtitle}
        </p>
        {children}
      </div>
    </section>
  );
}