import Link from "next/link";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
};

export function PageIntro({
  eyebrow,
  title,
  description,
  actionHref,
  actionLabel,
}: PageIntroProps) {
  return (
    <section className="page-intro">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {actionHref && actionLabel && (
        <Link className="button button--primary" href={actionHref}>{actionLabel}</Link>
      )}
    </section>
  );
}
