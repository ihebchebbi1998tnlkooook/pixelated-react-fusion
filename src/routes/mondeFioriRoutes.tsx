
import React from 'react';
import { Route } from "react-router-dom";

const MondeFioriHistoire = React.lazy(() => import('@/pages/MondeFioriHistoire'));
const MondeFioriCollection = React.lazy(() => import('@/pages/MondeFioriCollection'));
const MondeFioriDNA = React.lazy(() => import('@/pages/MondeFioriDNA'));

export const mondeFioriRoutes = [
  {
    path: "/monde-fiori/histoire",
    element: <MondeFioriHistoire />,
    seo: {
      title: "Notre Histoire | Monde Fiori",
      description: "Découvrez l'histoire de Fiori, une marque de luxe tunisienne engagée dans l'excellence depuis sa création."
    }
  },
  {
    path: "/monde-fiori/collection",
    element: <MondeFioriCollection />,
    seo: {
      title: "Nos Collections | Monde Fiori",
      description: "Explorez l'univers de nos collections exclusives. L'expression du luxe à la tunisienne."
    }
  },
  {
    path: "/monde-fiori/dna",
    element: <MondeFioriDNA />,
    seo: {
      title: "Notre ADN | Monde Fiori",
      description: "Plongez dans l'essence de Fiori. Nos valeurs, notre vision et notre engagement envers l'excellence."
    }
  }
];
