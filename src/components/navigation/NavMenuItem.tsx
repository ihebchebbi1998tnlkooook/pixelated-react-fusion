import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

interface NavMenuItemProps {
  title: string;
  image: string;
  children: React.ReactNode;
  href?: string;
}

const NavMenuItem = ({ title, image, children, href }: NavMenuItemProps) => {
  const navigate = useNavigate();
  const isGiftUniverse = title === "L'univers Cadeaux";
  
  const handleClick = (e: React.MouseEvent) => {
    if (href) {
      e.preventDefault();
      navigate(href);
    }
  };
  
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger 
        onClick={handleClick}
        className="text-red text-[16px] lg:text-[21px] bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent"
      >
        {title}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="w-screen max-w-screen-2xl mx-auto grid gap-0 px-6 py-2 md:grid-cols-[1fr_345px] bg-[#EFEDED] h-[242px] shadow-none">
          <div className="grid gap-2 overflow-y-auto">
            {React.Children.map(children, child => {
              if (isGiftUniverse) {
                return React.cloneElement(child as React.ReactElement, {
                  children: React.Children.map(
                    (child as React.ReactElement).props.children,
                    (subChild: React.ReactElement) => {
                      if (subChild?.props?.items) {
                        const updatedItems = subChild.props.items.map((item: any) => ({
                          ...item,
                          href: item.href.replace('/category/univers-cadeaux', '/univers-cadeaux')
                        }));
                        return React.cloneElement(subChild, { items: updatedItems });
                      }
                      return subChild;
                    }
                  )
                });
              }
              return child;
            })}
          </div>
          <div className="flex items-center justify-center h-full">
            <div className="relative w-full h-full">
              <img
                src={image}
                alt={`${title} Collection`}
                className="absolute inset-0 w-full h-full object-contain transform scale-125"
              />
            </div>
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default NavMenuItem;