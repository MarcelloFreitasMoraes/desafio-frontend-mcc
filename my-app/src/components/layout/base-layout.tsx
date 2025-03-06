import React from 'react';
import { Footer, Header } from '..';

interface BaseLayoutProps {
    children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({children}) => {
  return(
    <>
        <Header />
        {children}
        <Footer />
    </>
  )
}

export default BaseLayout;