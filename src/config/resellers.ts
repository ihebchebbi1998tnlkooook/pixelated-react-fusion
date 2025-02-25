
export interface Supplier {
  id: string;
  name: string;
  logo: string;
  description: string;
}

export interface Store {
  id: number;
  name: string;
  address: string;
  coordinates: [number, number];
  suppliers: string[];
}

export const suppliers: Supplier[] = [
  {
    id: 'founashop',
    name: 'Founashop',
    logo: 'https://www.tazart.tn/images/partners/founashop.webp',
    description: 'Votre partenaire de confiance pour les équipements professionnels'
  },
  {
    id: 'jenaina',
    name: 'Jenaina',
    logo: 'https://www.tazart.tn/images/partners/jenaina.webp',
    description: 'Solutions complètes pour les professionnels de la restauration'
  },
  {
    id: 'viveznature',
    name: 'Vivez Nature',
    logo: 'https://www.tazart.tn/images/partners/viveznature.webp',
    description: 'Produits eco-responsables pour professionnels'
  }
];

export const stores: Store[] = [
  {
    id: 1,
    name: "Store Tunis Centre",
    address: "123 Avenue Habib Bourguiba, Tunis",
    coordinates: [36.8065, 10.1815], // Latitude, Longitude
    suppliers: ['founashop', 'jenaina']
  },
  {
    id: 2,
    name: "Store La Marsa",
    address: "45 Avenue de la Plage, La Marsa",
    coordinates: [36.8892, 10.3229],
    suppliers: ['jenaina', 'viveznature']
  },
  {
    id: 3,
    name: "Store Sousse",
    address: "78 Avenue du 14 Janvier, Sousse",
    coordinates: [35.8288, 10.6405],
    suppliers: ['founashop', 'viveznature']
  }
];
