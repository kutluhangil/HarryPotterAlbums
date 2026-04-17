import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { usePortfolio } from "@/context/PortfolioContext";
import { useI18n } from "@/context/I18nContext";
import { localized } from "@/lib/i18n-helpers";
import { FilmstripGallery } from "@/components/gallery/FilmstripGallery";
import { GallerySkeleton } from "@/components/gallery/GallerySkeleton";
import { SEO } from "@/components/seo/SEO";
import NotFound from "./NotFound";

export default function SeriesPage() {
  const { slug } = useParams<{ slug: string }>();
  const { getSeriesBySlug, photographer, loading } = usePortfolio();
  const { lang, t } = useI18n();

  const series = slug ? getSeriesBySlug(slug) : null;

  const seriesTitle = series ? localized(series.title, lang) : "";
  const seriesDescription = series ? localized(series.description, lang) : "";

  const seoTitle = series
    ? `${seriesTitle} — ${photographer?.name || "Wizarding Realm"}`
    : photographer?.name || "Wizarding Realm";

  const seoDescription =
    seriesDescription || `${seriesTitle || "Wizarding Realm"} — ${photographer?.name || ""}`;

  const structuredData = series
    ? {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        name: seriesTitle,
        description: seriesDescription,
        image: series.images.map((img) => ({
          "@type": "ImageObject",
          url: img.src,
          caption: img.alt,
        })),
      }
    : undefined;

  useEffect(() => {
    if (series) {
      document.title = seoTitle;
    }
    const preconnectLink = document.createElement("link");
    preconnectLink.rel = "preconnect";
    preconnectLink.href = "https://images.unsplash.com";
    if (!document.querySelector(`link[href="${preconnectLink.href}"]`)) {
      document.head.appendChild(preconnectLink);
    }
  }, [series, seoTitle]);

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

  if (!series) {
    return <NotFound />;
  }

  return (
    <Layout>
      <SEO
        title={seoTitle}
        description={seoDescription}
        image={series.images[0]?.src}
        type="article"
        structuredData={structuredData}
      />
      <div className="h-full flex flex-col items-center justify-center gap-6 lg:gap-10">
        {/* Series header */}
        <div className="text-center max-w-2xl px-4">
          <h2 className="font-sans tracking-widest text-2xl sm:text-3xl text-magic-gold">
            {seriesTitle}
          </h2>
          {seriesDescription && (
            <p className="mt-3 font-serif italic text-sm sm:text-base text-muted-foreground leading-relaxed">
              {seriesDescription}
            </p>
          )}
        </div>
        <div className="w-full">
          <FilmstripGallery images={series.images} />
        </div>
      </div>
    </Layout>
  );
}
