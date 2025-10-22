import { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  title?: string;
  children: ReactNode;
  kind?: 'default' | 'alt';
}

export function Section({ id, title, children, kind = 'default' }: SectionProps) {
  return (
    <section id={id} className={`section section--${kind}`.trim()} aria-labelledby={title ? `${id}-title` : undefined}>
      {title && (
        <h2 className="section__title" id={`${id}-title`}>
          {title}
        </h2>
      )}
      <div className="section__body">{children}</div>
    </section>
  );
}

