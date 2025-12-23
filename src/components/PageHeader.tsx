import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  breadcrumbs: { name: string; path: string }[];
}

export function PageHeader({ title, breadcrumbs }: PageHeaderProps) {
  return (
    <section className="page-header">
      <div className="container-custom relative z-10">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 text-shadow-soft">
          {title}
        </h1>
        <nav className="inline-flex items-center gap-2 px-6 py-3 bg-background rounded-full shadow-soft">
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.path} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-muted-foreground">{crumb.name}</span>
              ) : (
                <Link
                  to={crumb.path}
                  className="text-primary hover:text-primary-dark transition-colors"
                >
                  {crumb.name}
                </Link>
              )}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}
