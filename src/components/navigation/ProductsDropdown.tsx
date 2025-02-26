
import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface SubMenuItem {
  label: string;
  href: string;
}

interface MenuItem {
  label: string;
  items: SubMenuItem[];
}

const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Dattes',
    items: [
      { label: 'Deglet Nour', href: 'produits/dattes/deglet-nour' },
      { label: 'Dattes Fraîches', href: 'produits/dattes/fraiches' },
      { label: 'Dattes Premium', href: 'produits/dattes/premium' },
    ]
  },
  {
    label: 'Figues Séchées',
    items: [
      { label: 'Figues Nature', href: 'produits/figues/nature' },
      { label: 'Figues au Chocolat', href: 'produits/figues/chocolat' },
      { label: 'Figues Caramélisées', href: 'produits/figues/caramel' },
    ]
  },
  {
    label: 'Sirops de Fruits',
    items: [
      { label: 'Sirop de Datte', href: 'produits/sirops/datte' },
      { label: 'Sirop de Figue', href: 'produits/sirops/figue' },
      { label: 'Sirop de Grenade', href: 'produits/sirops/grenade' },
    ]
  },
  {
    label: 'Sucre de Datte',
    items: [
      { label: 'Sucre Naturel', href: 'produits/sucre/naturel' },
      { label: 'Sucre Cristallisé', href: 'produits/sucre/cristallise' },
      { label: 'Poudre de Datte', href: 'produits/sucre/poudre' },
    ]
  }
];

interface ProductsDropdownProps {
  onPageChange?: (page: string) => void;
}

const ProductsDropdown = ({ onPageChange }: ProductsDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const handleClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onPageChange) {
      onPageChange(href);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative group">
      {/* Main Trigger Button */}
      <button
        onMouseEnter={() => setIsOpen(true)}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-[#96cc39] transition-colors"
      >
        Produits
        <ChevronDown className="w-4 h-4" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          onMouseLeave={() => {
            setIsOpen(false);
            setActiveSubmenu(null);
          }}
          className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50"
        >
          {MENU_ITEMS.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setActiveSubmenu(item.label)}
            >
              <button
                className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#96cc39]"
              >
                {item.label}
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Submenu */}
              {activeSubmenu === item.label && (
                <div className="absolute top-0 left-full ml-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                  {item.items.map((subItem) => (
                    <a
                      key={subItem.label}
                      href="#"
                      onClick={(e) => handleClick(subItem.href, e)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#96cc39]"
                    >
                      {subItem.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsDropdown;
