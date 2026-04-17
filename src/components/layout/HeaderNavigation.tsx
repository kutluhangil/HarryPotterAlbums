import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Languages } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { useI18n } from "@/context/I18nContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface NavItem {
  to: string;
  label: { tr: string; en: string };
}

const NAV_ITEMS: NavItem[] = [
  { to: "/series/characters", label: { tr: "Karakterler", en: "Characters" } },
  { to: "/series/spells", label: { tr: "Büyüler", en: "Spells" } },
  { to: "/series/items", label: { tr: "Büyülü Eşyalar", en: "Magical Items" } },
  { to: "/series/houses", label: { tr: "Binalar", en: "Houses" } },
];

export function HeaderNavigation() {
  const { photographer } = usePortfolio();
  const { lang, toggle, t } = useI18n();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!photographer) return null;

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleNavClick = () => setIsMenuOpen(false);

  const aboutLabel = lang === "tr" ? "Hakkında" : "About";

  return (
    <div className="relative w-full">
      <div className="flex items-end justify-between mb-2">
        <div className="flex justify-between md:justify-start w-full md:w-fit md:flex-col gap-4">
          {/* Site title */}
          <Link to="/" className="flex-shrink-0 group">
            <h1 className="font-sans text-2xl sm:text-[2.1rem] lg:text-[2.4rem] leading-tight font-bold tracking-wider text-magic-gold transition-opacity group-hover:opacity-80">
              {photographer.name}
            </h1>
          </Link>

          {/* Mobile: hamburger */}
          <div className="sm:hidden flex items-center gap-2">
            <button
              onClick={toggle}
              className="px-2 py-1 text-xs font-sans tracking-wider text-muted-foreground hover:text-accent transition-colors border border-border rounded"
              aria-label="Toggle language"
            >
              {t("lang.toggle")}
            </button>
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-2 -m-2 hover:opacity-70 transition-opacity"
                  aria-label={t("nav.openMenu")}
                  aria-expanded={isMenuOpen}
                >
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] bg-background">
                <SheetHeader>
                  <SheetTitle className="font-sans tracking-wider text-magic-gold">
                    {t("nav.menu")}
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-8">
                  <ul className="flex flex-col gap-6">
                    {NAV_ITEMS.map((item) => (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          onClick={handleNavClick}
                          className={`font-sans tracking-wider text-lg transition-all duration-200 ${
                            isActive(item.to)
                              ? "font-semibold text-accent"
                              : "font-normal text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {item.label[lang]}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        to="/about"
                        onClick={handleNavClick}
                        className={`font-sans tracking-wider text-lg transition-all duration-200 ${
                          isActive("/about")
                            ? "font-semibold text-accent"
                            : "font-normal text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {aboutLabel}
                      </Link>
                    </li>

                    <li className="mt-8 pt-6 border-t border-border">
                      <div className="flex flex-col gap-3 text-sm text-muted-foreground font-serif italic">
                        <a
                          href={`mailto:${photographer.contact.email}`}
                          className="hover:text-accent transition-colors"
                        >
                          ✉ {photographer.contact.email}
                        </a>
                        <span>🦉 {photographer.contact.phone}</span>
                      </div>
                    </li>
                  </ul>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Tablet/Desktop: horizontal nav */}
          <nav className="hidden sm:block">
            <ul className="flex flex-row flex-wrap items-center gap-4 sm:gap-5 lg:gap-6">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={`font-sans tracking-wider text-sm sm:text-base lg:text-[1.0625rem] leading-[1.375rem] transition-all duration-200 ${
                      isActive(item.to)
                        ? "font-semibold text-accent"
                        : "font-normal text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label[lang]}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/about"
                  className={`font-sans tracking-wider text-sm sm:text-base lg:text-[1.0625rem] leading-[1.375rem] transition-all duration-200 ${
                    isActive("/about")
                      ? "font-semibold text-accent"
                      : "font-normal text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {aboutLabel}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Contact + language - desktop */}
        <div className="hidden md:flex flex-col items-end gap-1 text-sm lg:text-[0.9375rem] text-muted-foreground font-serif">
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-sans tracking-widest text-muted-foreground hover:text-accent transition-colors border border-border rounded"
            aria-label="Toggle language"
          >
            <Languages className="h-3.5 w-3.5" />
            {t("lang.toggle")}
          </button>
          <a href={`mailto:${photographer.contact.email}`} className="hover:text-accent transition-colors py-0.5 italic">
            ✉ {photographer.contact.email}
          </a>
          <span className="italic">🦉 {photographer.contact.phone}</span>
        </div>
      </div>
    </div>
  );
}
