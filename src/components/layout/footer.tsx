import React from 'react';

const Footer: React.FC = () => {
  return(
    <footer className="px-4 py-20 border-muted-foreground border-t-2 w-full bg-blue-950 ">
    <div className="container mx-auto text-center font-orbitron">
      <img src={'/logo_hollow_white.png'} alt="Star Wars Footer Logo" className="h-8 mx-auto mb-4" />
      <p className='text-white'>© {new Date().getFullYear()} Marcelo Moraes</p>
      <p className='text-white'>
        Data provided by{" "}
        <a href="https://swapi.dev/" className="underline">
          SWAPI
        </a>
      </p>
    </div>
  </footer>
  )
}

export default Footer;