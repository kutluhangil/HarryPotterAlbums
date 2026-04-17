import { usePortfolio } from "@/context/PortfolioContext";
import { useI18n } from "@/context/I18nContext";

export function Footer() {
  const { photographer } = usePortfolio();
  const { t } = useI18n();

  if (!photographer) return null;

  const obfuscateEmail = (email: string) => email.replace("@", "[at]");

  return (
    <div className="h-full flex items-center px-4 sm:px-8 lg:px-12 border-t border-border bg-background">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[0.8125rem] leading-4 text-muted-foreground font-serif italic">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href={`mailto:${photographer.contact.email}`}
              className="hover:text-accent transition-colors"
              aria-label={`Email ${photographer.name}`}
            >
              ✉ {obfuscateEmail(photographer.contact.email)}
            </a>
            <span>🦉 {photographer.contact.phone}</span>
          </div>

          <p className="text-center sm:text-right font-sans tracking-wider not-italic text-xs">
            &copy; {new Date().getFullYear()} {photographer.name}. {t("footer.rights")}
          </p>
        </div>
      </div>
    </div>
  );
}
