import React from 'react';
import SubMenuSection from '../../navigation/SubMenuSection';

const AccessoiresSection = () => {
  return (
    <div className="grid grid-cols-3 gap-3">
      <SubMenuSection
        title="Homme"
        items={[
          {
            href: "/category/accessoires/homme/ceintures",
            title: "Ceinture",
            description: "Ceintures raffinées"
          },
          {
            href: "/category/accessoires/homme/cravates",
            title: "Cravate",
            description: "Cravates élégantes"
          },
          {
            href: "/category/accessoires/homme/mallettes",
            title: "Mallette",
            description: "Mallettes professionnelles"
          }
        ]}
      />
      <SubMenuSection
        title="Femme"
        items={[
          {
            href: "/category/accessoires/femme/sacs-a-main",
            title: "Sacs à main",
            description: "Sacs à main élégants"
          }
        ]}
      />
      <SubMenuSection
        title="Autres"
        items={[
          {
            href: "/category/accessoires/homme/portefeuilles",
            title: "Portefeuille",
            description: "Portefeuilles élégants"
          },
          {
            href: "/category/accessoires/homme/porte-cartes",
            title: "Porte-carte",
            description: "Porte-cartes élégants"
          },
          {
            href: "/category/accessoires/homme/porte-cles",
            title: "Porte-clé",
            description: "Porte-clés élégants"
          },
          {
            href: "/category/accessoires/homme/porte-passport",
            title: "Porte-passport",
            description: "Porte-passports élégants"
          }
        ]}
      />
    </div>
  );
};

export default AccessoiresSection;