import Link from "next/link";

type EmptyStateProps = {
  icon: string;
  title: string;
  description: string;
  href?: string;
  action?: string;
};

export function EmptyState({ icon, title, description, href, action }: EmptyStateProps) {
  return (
    <section className="empty-state">
      <span className="empty-state__icon" aria-hidden="true">{icon}</span>
      <h2>{title}</h2>
      <p>{description}</p>
      {href && action && <Link className="button button--primary" href={href}>{action}</Link>}
    </section>
  );
}
