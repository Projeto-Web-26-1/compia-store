import Link from "next/link";

type BrandProps = {
  compact?: boolean;
  inverted?: boolean;
};

export function Brand({ compact = false, inverted = false }: BrandProps) {
  return (
    <Link
      className={`brand${inverted ? " brand--inverted" : ""}`}
      href="/"
      aria-label="COMPIA Editora - início"
    >
      <span className="brand__mark" aria-hidden="true">C</span>
      <span className="brand__copy">
        <strong>COMPIA</strong>
        {!compact && <small>Editora de Inteligência Artificial</small>}
      </span>
    </Link>
  );
}
