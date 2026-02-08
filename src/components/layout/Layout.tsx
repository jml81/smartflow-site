import type { ReactNode } from 'react';
import { LazyMotion, domAnimation } from 'motion/react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Breadcrumb } from './Breadcrumb';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps): ReactNode {
  return (
    <LazyMotion features={domAnimation} strict>
      <div className="flex min-h-screen flex-col">
        <Header />
        <Breadcrumb />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </LazyMotion>
  );
}
