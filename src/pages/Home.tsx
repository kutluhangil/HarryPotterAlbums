import { Layout } from "@/components/layout/Layout";
import { usePortfolio } from "@/context/PortfolioContext";
import { useI18n } from "@/context/I18nContext";
import { FilmstripGallery } from "@/components/gallery/FilmstripGallery";
import { GallerySkeleton } from "@/components/gallery/GallerySkeleton";
import { SEO } from "@/components/seo/SEO";
import { useEffect } from "react";

export default function Home() {
  const { series, photographer, loading, error } = usePortfolio();
  const { t, lang } = useI18n();

  const featuredSeries = series.find((s) => s.featured) || series[0];

  const seoTitle = photographer
    ? `${photographer.name} — ${lang === "tr" ? "Harry Potter Evreni" : "Harry Potter Universe"}`
    : "Wizarding Realm";
  const seoDescription = t("hero.tagline");

  useEffect(() => {
    document.title = seoTitle;
    const preconnectLink = document.createElement("link");
    preconnectLink.rel = "preconnect";
    preconnectLink.href = "https://images.unsplash.com";
    document.head.appendChild(preconnectLink);
    return () => {
      if (document.head.contains(preconnectLink)) {
        document.head.removeChild(preconnectLink);
      }
    };
  }, [seoTitle]);

  if (loading) {
    return (
      <Layout>
        <SEO title={t("loading")} description={t("loading")} />
        <div className="h-full flex items-center justify-center">
          <GallerySkeleton />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <SEO title={t("error.title")} description={t("error.title")} />
        <div className="flex items-center justify-center h-full">
          <div className="text-center max-w-md px-4">
            <p className="text-destructive font-semibold font-sans tracking-wider">{t("error.title")}</p>
            <p className="mt-2 text-sm text-muted-foreground font-serif">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-accent text-primary-foreground rounded hover:opacity-80 transition-opacity font-sans tracking-wider text-sm"
            >
              {t("error.retry")}
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title={seoTitle}
        description={seoDescription}
        image={featuredSeries?.images[0]?.src}
        type="website"
      />
      <div className="h-full flex flex-col items-center justify-center gap-8 lg:gap-12">
        {/* Hero tagline */}
        <div className="text-center max-w-2xl px-4">
          <p className="font-serif italic text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
            {t("hero.tagline")}
          </p>
          <div className="mt-4 flex items-center justify-center gap-3 text-accent">
            <span className="h-px w-12 bg-accent/40" />
            <span className="font-sans text-xs tracking-[0.4em]">✦ ✦ ✦</span>
            <span className="h-px w-12 bg-accent/40" />
          </div>
        </div>

        {featuredSeries ? (
          <div className="w-full">
            <FilmstripGallery images={featuredSeries.images} />
          </div>
        ) : (
          <p className="text-muted-foreground font-serif italic">{t("gallery.empty")}</p>
        )}
      </div>
    </Layout>
  );
}
