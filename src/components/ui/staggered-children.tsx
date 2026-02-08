import { type ReactNode } from 'react';
import { m } from 'motion/react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

interface StaggeredChildrenProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: 'div' | 'ul' | 'ol';
}

const containerVariants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: {
      staggerChildren: stagger,
    },
  }),
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export function StaggeredChildren({
  children,
  className,
  stagger = 0.1,
  as = 'div',
}: StaggeredChildrenProps): ReactNode {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const Component = m[as];

  return (
    <Component
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      custom={stagger}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}

interface StaggeredItemProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li';
}

export function StaggeredItem({ children, className, as = 'div' }: StaggeredItemProps): ReactNode {
  const Component = m[as];

  return (
    <Component variants={childVariants} className={cn(className)}>
      {children}
    </Component>
  );
}
