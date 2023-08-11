import React from 'react'

import './components/home.css'
import Home from './components/Home.jsx';
import AboutUs from './components/AboutUs.jsx';
import Footer from './components/Footer.jsx';

export default function Page(){

    return (
        <div>
            <Home />
            <AboutUs />
            <Footer />
        </div>
    );
}