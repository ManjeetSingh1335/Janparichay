import React, {useEffect} from 'react'
import {Outlet, useLocation} from "react-router-dom";   
import Navbar from './Navbar.jsx'
import Sidebar from './Sidebar.jsx'
import Footer from './Footer.jsx'
import './Layout.css'

function MainLayout() {
  const {pathname} = useLocation();

  useEffect(() => {
    if('scrollRestoration' in window.history){
      window.history.scrollRestoration = 'manual';
    }

    const handleScrollReset = () => {
      window.scrollTo(0,0);
      
      const scrollableElements = [
        document.documentElement,
        document.body,
        document.getElementById('root'),
        document.querySelector('.layout-container'),
        document.querySelector('.layout-body'),
        document.querySelector('.layout-content'),
        document.querySelector('main')
      ];

      scrollableElements.forEach(el => {
        if(el){
          el.scrollTop = 0;
          el.scrollLeft = 0;
        }
      });
    };

    handleScrollReset();
    const t1 = setTimeout(handleScrollReset, 20);
    const t2 = setTimeout(handleScrollReset, 80);
    const t3 = setTimeout(handleScrollReset, 150);

    return() => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname]);

  return (
    <div className="layout-container">
        <Navbar/>
        <div className="layout-body">
            <Sidebar/>
            <main className="layout-content">
                <Outlet/>
            </main>
        </div>
        <Footer/>
    </div>
  )
}

export default MainLayout