// Localized string: either a plain string (legacy) or a TR/EN object.
export type LocalizedString = string | { tr: string; en: string };

export interface GalleryImage {
  id: string;
  src: string;
  srcSet?: string;
  alt: string;
  aspectRatio: number;
  caption: {
    subject: string;
    profession: LocalizedString;
  };
  metadata: {
    title: string;
    year: string;
    description?: LocalizedString;
    location?: LocalizedString;
    camera?: string;
    series: string;
  };
}

export interface PortfolioSeries {
  id: string;
  title: LocalizedString;
  slug: string;
  description: LocalizedString;
  images: GalleryImage[];
  featured: boolean;
}

export interface FilmstripGalleryProps {
  images: GalleryImage[];
  className?: string;
  autoAdvance?: boolean;
  autoAdvanceInterval?: number;
}

export interface GalleryControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  currentIndex: number;
  totalImages: number;
  className?: string;
}
