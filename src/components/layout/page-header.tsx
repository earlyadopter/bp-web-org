interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="border-b border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-brand-charcoal sm:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 text-lg text-gray-600">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
