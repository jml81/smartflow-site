import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AnimatedSection } from '@/components/ui/animated-section';
import { StaggeredChildren, StaggeredItem } from '@/components/ui/staggered-children';
import { usePageMeta } from '@/hooks/use-page-meta';
import { Mail, MapPin, Send, AlertCircle, Building } from 'lucide-react';
import { toast } from 'sonner';

interface ContactInfoProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  href?: string;
}

function ContactInfo({ icon, title, content, href }: ContactInfoProps): React.ReactNode {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        {href ? (
          <a href={href} className="text-muted-foreground transition-colors hover:text-primary">
            {content}
          </a>
        ) : (
          <span className="text-muted-foreground">{content}</span>
        )}
      </div>
    </div>
  );
}

function FieldError({ error }: { error?: string }): React.ReactNode {
  if (!error) return null;
  return (
    <p className="mt-1 flex items-center gap-1 text-sm text-destructive" role="alert">
      <AlertCircle className="h-4 w-4" aria-hidden="true" />
      {error}
    </p>
  );
}

function SuccessCheckmark(): React.ReactNode {
  return (
    <svg
      className="mx-auto h-16 w-16 text-primary"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2" opacity="0.2" />
      <circle
        cx="32"
        cy="32"
        r="30"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="188.5"
        strokeDashoffset="188.5"
        className="animate-[draw-circle_0.6s_ease-out_forwards]"
      />
      <path
        d="M20 32 L28 40 L44 24"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="40"
        strokeDashoffset="40"
        className="animate-[draw-check_0.4s_ease-out_0.4s_forwards]"
      />
    </svg>
  );
}

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const Yhteystiedot = (): React.ReactNode => {
  const { t } = useTranslation('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  usePageMeta({
    title: t('meta.title'),
    description: t('meta.description'),
  });

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = t('validation.nameRequired');
    if (!formData.email.trim()) {
      newErrors.email = t('validation.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('validation.emailInvalid');
    }
    if (!formData.organization.trim())
      newErrors.organization = t('validation.organizationRequired');
    if (!formData.message.trim()) newErrors.message = t('validation.messageRequired');
    if (RECAPTCHA_SITE_KEY && !recaptchaToken) {
      newErrors.recaptcha = t('validation.recaptchaRequired');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || undefined,
          organization: formData.organization.trim() || undefined,
          message: formData.message.trim(),
          recaptchaToken: recaptchaToken ?? '',
        }),
      });

      const result = (await response.json()) as { success: boolean; error?: string };

      if (!result.success) {
        const errorKey = result.error ?? '';
        const errorMsg = t(`errors.${errorKey}`, { defaultValue: t('errors.generic') });
        toast.error(errorMsg);
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
        return;
      }

      setIsSubmitted(true);
    } catch {
      toast.error(t('errors.network'));
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="bg-muted/50 py-12 md:py-16">
        <div className="container">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">{t('hero.title')}</h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">{t('hero.subtitle')}</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <AnimatedSection direction="left">
                <h2 className="text-2xl font-bold">{t('info.title')}</h2>
                <p className="mt-4 text-muted-foreground">{t('info.subtitle')}</p>
                <StaggeredChildren className="mt-8 space-y-6" stagger={0.1}>
                  <StaggeredItem>
                    <ContactInfo
                      icon={<Mail className="h-5 w-5" aria-hidden="true" />}
                      title={t('info.email')}
                      content={t('info.emailValue')}
                      href={`mailto:${t('info.emailValue')}`}
                    />
                  </StaggeredItem>
                  <StaggeredItem>
                    <ContactInfo
                      icon={<MapPin className="h-5 w-5" aria-hidden="true" />}
                      title={t('info.address')}
                      content={t('info.addressValue')}
                    />
                  </StaggeredItem>
                  <StaggeredItem>
                    <ContactInfo
                      icon={<Building className="h-5 w-5" aria-hidden="true" />}
                      title={t('info.company')}
                      content={t('info.companyValue')}
                    />
                  </StaggeredItem>
                </StaggeredChildren>
                <div className="mt-10 rounded-xl border border-border bg-muted/50 p-6">
                  <h3 className="font-semibold">{t('privacy.title')}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t('privacy.description')}</p>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="right">
                {isSubmitted ? (
                  <div className="rounded-2xl border border-border bg-card p-8 text-center">
                    <SuccessCheckmark />
                    <h2 className="mt-6 text-2xl font-bold">{t('success.title')}</h2>
                    <p className="mt-4 text-muted-foreground">{t('success.description')}</p>
                    <Button
                      className="mt-8"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          organization: '',
                          message: '',
                        });
                        setRecaptchaToken(null);
                        recaptchaRef.current?.reset();
                      }}
                    >
                      {t('success.newMessage')}
                    </Button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="rounded-2xl border border-border bg-card p-6 md:p-8"
                    noValidate
                  >
                    <h2 className="text-xl font-bold">{t('form.title')}</h2>
                    <div className="mt-6 space-y-5">
                      <div>
                        <Label htmlFor="name">
                          {t('form.name')}{' '}
                          <span className="text-destructive" aria-hidden="true">
                            {t('form.required')}
                          </span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          className="mt-2 focus:shadow-[var(--glow-coral)]"
                          aria-required="true"
                          aria-invalid={!!errors.name}
                        />
                        <FieldError error={errors.name} />
                      </div>
                      <div>
                        <Label htmlFor="email">
                          {t('form.email')}{' '}
                          <span className="text-destructive" aria-hidden="true">
                            {t('form.required')}
                          </span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="mt-2 focus:shadow-[var(--glow-coral)]"
                          aria-required="true"
                          aria-invalid={!!errors.email}
                        />
                        <FieldError error={errors.email} />
                      </div>
                      <div>
                        <Label htmlFor="phone">{t('form.phone')}</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="mt-2 focus:shadow-[var(--glow-coral)]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="organization">
                          {t('form.organization')}{' '}
                          <span className="text-destructive" aria-hidden="true">
                            {t('form.required')}
                          </span>
                        </Label>
                        <Input
                          id="organization"
                          name="organization"
                          type="text"
                          value={formData.organization}
                          onChange={handleChange}
                          className="mt-2 focus:shadow-[var(--glow-coral)]"
                          aria-required="true"
                          aria-invalid={!!errors.organization}
                        />
                        <FieldError error={errors.organization} />
                      </div>
                      <div>
                        <Label htmlFor="message">
                          {t('form.message')}{' '}
                          <span className="text-destructive" aria-hidden="true">
                            {t('form.required')}
                          </span>
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          className="mt-2 min-h-[120px] focus:shadow-[var(--glow-coral)]"
                          aria-required="true"
                          aria-invalid={!!errors.message}
                        />
                        <FieldError error={errors.message} />
                      </div>
                      {RECAPTCHA_SITE_KEY && (
                        <div>
                          <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={RECAPTCHA_SITE_KEY}
                            onChange={(token) => {
                              setRecaptchaToken(token);
                              if (errors.recaptcha) {
                                setErrors((prev) => ({ ...prev, recaptcha: '' }));
                              }
                            }}
                            onExpired={() => setRecaptchaToken(null)}
                          />
                          <FieldError error={errors.recaptcha} />
                        </div>
                      )}
                      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          t('form.submitting')
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" aria-hidden="true" />
                            {t('form.submit')}
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Yhteystiedot;
