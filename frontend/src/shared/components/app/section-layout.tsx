import { cn } from '@/shared/lib/utils';

/**
 * Section component
 * @param {SectionProps} props - The component props
 * @param {React.ReactNode} props.children - The component children
 * @param {string} props.className - The class names
 */
export function Section({ children, className }: SectionProps) {
  return (
    <section className={cn('w-full px-4', className)}>
      <div className="container mx-auto">{children}</div>
    </section>
  );
}

/**
 * Section component props
 */
interface SectionProps {
  children: React.ReactNode;
  className?: string;
}
