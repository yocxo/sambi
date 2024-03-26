import { cn } from '@yocxo/ui';

import { FadeIn } from '#/ui/fade-in';
import { Container } from '#/ui/page-container';

export function SectionIntro({
  title,
  eyebrow,
  children,
  smaller = false,
  centered = false,
  ...props
}: Omit<
  React.ComponentPropsWithoutRef<typeof Container>,
  'title' | 'children'
> & {
  title: string;
  eyebrow?: string;
  children?: React.ReactNode;
  smaller?: boolean;
  centered?: boolean;
}) {
  return (
    <Container {...props} className={cn(centered && 'text-center')}>
      <FadeIn className={cn('max-w-2xl', centered && 'mx-auto')}>
        <h2>
          {eyebrow && (
            <>
              <span className="mb-6 block font-mono text-sm font-medium uppercase tracking-widest text-primary">
                {eyebrow}
              </span>
              <span className="sr-only"> - </span>
            </>
          )}
          <span
            className={cn(
              'block text-pretty font-mono font-semibold tracking-tighter text-foreground',
              smaller ? 'text-2xl' : 'text-3xl sm:text-4xl',
              centered && 'mx-auto',
            )}
          >
            {title}
          </span>
        </h2>
        {children && (
          <div
            className={cn(
              'mt-6 text-muted-foreground md:text-lg',
              centered && 'mx-auto',
            )}
          >
            {children}
          </div>
        )}
      </FadeIn>
    </Container>
  );
}
