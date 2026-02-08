import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LazyMotion, domAnimation } from 'motion/react';
import { AnimatedSection } from './animated-section';

function renderWithMotion(ui: React.ReactNode): ReturnType<typeof render> {
  return render(<LazyMotion features={domAnimation}>{ui}</LazyMotion>);
}

describe('AnimatedSection', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('renders children', () => {
    renderWithMotion(
      <AnimatedSection>
        <p>Test content</p>
      </AnimatedSection>,
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    renderWithMotion(
      <AnimatedSection className="custom-class">
        <p>Test</p>
      </AnimatedSection>,
    );
    const element = screen.getByText('Test').parentElement;
    expect(element).toHaveClass('custom-class');
  });

  it('renders as static element when reduced motion is preferred', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: true,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    renderWithMotion(
      <AnimatedSection>
        <p>Reduced motion</p>
      </AnimatedSection>,
    );
    expect(screen.getByText('Reduced motion')).toBeInTheDocument();
  });
});
