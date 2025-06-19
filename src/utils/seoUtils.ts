
interface MetaTags {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
}

export const getMetaTags = (path: string): MetaTags => {
  const basePath = path.split('/')[1];
  const subPath = path.split('/')[2];
  
  const metaTagsMap: Record<string, MetaTags> = {
    'pret-a-porter': {
      title: 'Prêt-à-Porter de Luxe | Collection Exclusive Fiori',
      description: 'Découvrez notre collection exclusive de prêt-à-porter haut de gamme. Costumes, chemises, robes et plus encore, confectionnés avec les meilleurs matériaux.',
      keywords: ['prêt-à-porter luxe', 'costumes sur mesure', 'chemises luxe', 'robes élégantes', 'vestes haute couture', 'pantalons raffinés', 'mode luxe tunisie', 'vêtements haute qualité']
    },
    'univers-cadeaux': {
      title: 'Coffrets Cadeaux de Luxe | Univers Cadeaux Fiori',
      description: 'Offrez l\'élégance avec nos coffrets cadeaux personnalisés. Collections premium et prestige, emballages luxueux et service personnalisé.',
      keywords: ['coffrets cadeaux luxe', 'pack cadeau premium', 'pack prestige', 'cadeaux luxe tunisie', 'cadeaux personnalisés', 'emballage cadeau luxe']
    },
    'accessoires': {
      title: 'Accessoires de Luxe | Collection Fiori',
      description: 'Enrichissez votre style avec nos accessoires haut de gamme. Ceintures en cuir, portefeuilles élégants, cravates en soie et plus encore.',
      keywords: ['accessoires luxe', 'ceintures cuir tunisie', 'portefeuilles haut de gamme', 'cravates soie', 'accessoires mode luxe', 'maroquinerie tunisie']
    },
    'sur-mesure': {
      title: 'Vêtements Sur Mesure | Service Personnalisé Fiori',
      description: 'Expérimentez l\'excellence du sur-mesure avec Fiori. Service de confection personnalisée pour une élégance unique et parfaitement ajustée.',
      keywords: ['sur mesure tunisie', 'costumes personnalisés', 'chemises sur mesure', 'tailleur luxe', 'vêtements personnalisés', 'confection haut de gamme']
    },
    'monde-fiori': {
      title: 'Le Monde Fiori | Histoire et Valeurs',
      description: 'Plongez dans l\'univers Fiori, une marque tunisienne de luxe engagée dans l\'excellence et l\'artisanat traditionnel.',
      keywords: ['marque luxe tunisie', 'histoire fiori', 'artisanat luxe', 'savoir-faire tunisien', 'tradition mode']
    },
    'outlet': {
      title: 'Outlet Fiori | Offres Exclusives sur le Luxe',
      description: 'Découvrez nos offres exceptionnelles sur une sélection de produits haut de gamme. Luxe accessible sans compromis sur la qualité.',
      keywords: ['outlet luxe', 'promotions mode', 'soldes vêtements luxe', 'bonnes affaires luxe', 'déstockage haut de gamme']
    },
    'product': {
      title: 'Collection Exclusive | Fiori',
      description: 'Découvrez nos pièces exclusives, confectionnées avec les meilleurs matériaux et un savoir-faire d\'exception.',
      keywords: ['produits luxe', 'collection exclusive', 'mode haut de gamme', 'vêtements luxe tunisie', 'accessoires exclusifs']
    }
  };

  // Add support for product detail pages
  if (basePath === 'product' && subPath) {
    return {
      title: `${metaTagsMap[basePath].title} | Réf. ${subPath}`,
      description: metaTagsMap[basePath].description,
      keywords: metaTagsMap[basePath].keywords,
      canonical: `https://fioriforyou.com/product/${subPath}`
    };
  }

  return metaTagsMap[basePath] || {
    title: 'Fiori - Vêtements Personnalisés & Haut de Gamme en Tunisie',
    description: 'Découvrez l\'élégance personnalisée avec Fiori. Vêtements haut de gamme, accessoires de luxe et service sur mesure en Tunisie.',
    keywords: ['fiori tunisie', 'mode luxe', 'vêtements luxe tunisie', 'prêt-à-porter luxe', 'accessoires haut de gamme']
  };
};

export const updateMetaTags = (path: string): void => {
  const { title, description, keywords, canonical } = getMetaTags(path);
  
  document.title = title;
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  }
  
  // Update meta keywords
  const metaKeywords = document.querySelector('meta[name="keywords"]');
  if (metaKeywords) {
    metaKeywords.setAttribute('content', keywords.join(', '));
  }
  
  // Update OpenGraph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const ogUrl = document.querySelector('meta[property="og:url"]');
  
  if (ogTitle) ogTitle.setAttribute('content', title);
  if (ogDescription) ogDescription.setAttribute('content', description);
  if (ogUrl && canonical) ogUrl.setAttribute('content', canonical);

  // Update canonical URL
  let canonicalTag = document.querySelector('link[rel="canonical"]');
  if (!canonicalTag) {
    canonicalTag = document.createElement('link');
    canonicalTag.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalTag);
  }
  canonicalTag.setAttribute('href', canonical || `https://fioriforyou.com${path}`);

  // Update Twitter Card
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  
  if (twitterTitle) twitterTitle.setAttribute('content', title);
  if (twitterDescription) twitterDescription.setAttribute('content', description);
};

