
import React from 'react';
import { Route, Navigate } from "react-router-dom";
import { PageLoader } from "@/components/PageLoader";

// Lazy load pages
const Index = React.lazy(() => import("@/pages/Index"));
const CategoryPage = React.lazy(() => import("@/pages/CategoryPage"));
const GiftUniversePage = React.lazy(() => import("@/pages/GiftUniversePage"));
const CartPage = React.lazy(() => import('@/pages/CartPage'));
const PaymentSuccessPage = React.lazy(() => import('@/pages/PaymentSuccessPage'));
const PaymentFailurePage = React.lazy(() => import('@/pages/PaymentFailurePage'));
const PromoCodesPage = React.lazy(() => import('@/pages/PromoCodesPage'));
const OrderPreviewPage = React.lazy(() => import('@/pages/OrderPreviewPage'));
const ProductDetailPage = React.lazy(() => import('@/pages/ProductDetailPage'));

export const mainRoutes = [
  {
    path: "/",
    element: <Index />,
    seo: {
      title: "Fiori | Mode de Luxe et Vêtements Haut de Gamme en Tunisie",
      description: "Découvrez l'excellence de la mode de luxe avec Fiori. Vêtements haut de gamme, accessoires et service sur mesure en Tunisie."
    }
  },
  {
    path: "/category/*",
    element: <CategoryPage />,
    seo: {
      title: "Collections | Fiori",
      description: "Explorez nos collections exclusives de vêtements et accessoires de luxe. Qualité exceptionnelle et style intemporel."
    }
  },
  {
    path: "/univers-cadeaux/*",
    element: <GiftUniversePage />,
    seo: {
      title: "Univers Cadeaux | Fiori",
      description: "Découvrez notre sélection de coffrets cadeaux luxueux et personnalisés. L'art d'offrir selon Fiori."
    }
  },
  {
    path: "/cart",
    element: <CartPage />,
    seo: {
      title: "Panier | Fiori",
      description: "Finalisez votre sélection de produits de luxe Fiori. Une expérience d'achat premium."
    }
  },
  {
    path: "/payment-success",
    element: <PaymentSuccessPage />,
    seo: {
      title: "Paiement Réussi | Fiori",
      description: "Confirmation de votre commande Fiori. Merci de votre confiance."
    }
  },
  {
    path: "/payment-failure",
    element: <PaymentFailurePage />,
    seo: {
      title: "Échec du Paiement | Fiori",
      description: "Une erreur est survenue lors de votre paiement. Veuillez réessayer."
    }
  },
  {
    path: "/promo-codes",
    element: <PromoCodesPage />,
    seo: {
      title: "Codes Promo | Fiori",
      description: "Profitez de nos offres exclusives et codes promotionnels sur notre collection de luxe."
    }
  },
  {
    path: "/order-preview",
    element: <OrderPreviewPage />,
    seo: {
      title: "Aperçu de la Commande | Fiori",
      description: "Vérifiez les détails de votre commande avant la confirmation finale."
    }
  },
  {
    path: "/product/:id",
    element: <ProductDetailPage />,
    seo: {
      title: "Produit | Fiori",
      description: "Découvrez ce produit exclusif de notre collection de luxe Fiori."
    }
  },
  {
    path: "*",
    element: <Navigate to="/" replace />
  }
];
