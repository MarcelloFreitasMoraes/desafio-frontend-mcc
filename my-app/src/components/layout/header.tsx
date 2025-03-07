import React from 'react';
import { Link } from 'react-router-dom';

const entityLinks = [
  { href: "/people", label: "People" },
  { href: "/films", label: "Films" },
  { href: "/species", label: "Species" },
];

const Header: React.FC = () => {
  return (
    <header className="p-4 border-b-2 border-muted-foreground bg-blue-950">
      <nav className="max-w-screen-lg mx-auto flex flex-col sm:flex-row justify-between items-center">
        <Link to="/people" className="text-2xl font-bold flex justify-center sm:justify-start w-full sm:w-auto">
          <img src={'/logo_hollow_white.png'} alt="Star Wars Search" className="h-8 mx-auto sm:mx-0 mb-4 sm:mb-0" />
        </Link>

        <ul className="flex gap-6 pt-4 sm:pt-0 justify-center sm:justify-end w-full sm:w-auto">
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
};

export default Header;
