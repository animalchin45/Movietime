import React from 'react';
import { useMediaQuery } from 'react-responsive';

import Header from './Header/Header';
import MobileHeader from './Header/MobileHeader';
import Footer from './Footer';

const Layout = (props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' });

  return (
    <div className='layout'>
      {!isMobile && <Header />}
      {isMobile && <MobileHeader />}
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
