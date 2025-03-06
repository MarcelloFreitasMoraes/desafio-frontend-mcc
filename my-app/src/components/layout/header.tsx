import React from 'react';
import { Link } from 'react-router-dom';

const entityLinks = [
  { href: "/entities/films", label: "Films" },
  { href: "/entities/people", label: "People" },
  { href: "/entities/species", label: "Species" },
];

const Header: React.FC = () => {
  
  return (
    <header className="p-4 border-b-2 border-muted-foreground bg-blue-950">
      <nav className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          <img src={'/logo_hollow_white.png'} alt="Star Wars Search" className="h-8 mx-auto mb-4" />
        </Link>

        {/* Navegação */}
        <ul className="flex gap-6 pt-4 sm:pt-0">
          {entityLinks.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className="text-lg text-white hover:text-black transition"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;