
import React from 'react';
import { Route } from "react-router-dom";

const SurMesurePage = React.lazy(() => import('@/pages/SurMesurePage'));
const UniversCadeauxPage = React.lazy(() => import('@/pages/UniversCadeauxPage'));
const GiftCardsPage = React.lazy(() => import('@/pages/GiftCardsPage'));
const ServicesPage = React.lazy(() => import('@/pages/ServicesPage'));
const FooterCategoryPage = React.lazy(() => import('@/pages/FooterCategoryPage'));

export const serviceRoutes = [
  {
    path: "/sur-mesure",
    element: <SurMesurePage />,
    seo: {
      title: "Sur Mesure | Service Personnalisé Fiori",
      description: "Découvrez notre service de confection sur mesure. Une expérience unique pour des vêtements parfaitement ajustés."
    }
  },
  {
    path: "/univers-cadeaux",
    element: <UniversCadeauxPage />,
    seo: {
      title: "Univers Cadeaux | Collections Exclusives Fiori",
      description: "Explorez notre univers de cadeaux luxueux et personnalisés. Des coffrets uniques pour toutes les occasions."
    }
  },
  {
    path: "/gift-cards",
    element: <GiftCardsPage />,
    seo: {
      title: "Cartes Cadeaux | Fiori",
      description: "Offrez le choix avec nos cartes cadeaux Fiori. Le luxe en toute liberté."
    }
  },
  {
    path: "/services",
    element: <ServicesPage />,
    seo: {
      title: "Nos Services | Fiori",
      description: "Découvrez l'ensemble de nos services premium. Une expérience client exceptionnelle."
    }
  },
  {
    path: "/footer-category/*",
    element: <FooterCategoryPage />,
    seo: {
      title: "Informations | Fiori",
      description: "Toutes les informations utiles sur Fiori et nos services."
    }
  }
];
