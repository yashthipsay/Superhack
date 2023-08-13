import React from 'react'

import './components/home.css'
import Home from './components/Home.jsx';
import AboutUs from './components/AboutUs.jsx';
import Footer from './components/Footer.jsx';
import CanvasBG from './components/CanvasBG.jsx';

import './components/aboutus.css'
import PieChart from '../dashboard/components/GraphOne';

export default function Page(){

    return (
        <div>
            <CanvasBG />
            <Home />
            <div className="pie-wrap-wrapper">
                <div className="pie-wrapper">
                    <PieChart />
                </div>
            </div>
            <AboutUs />
            <Footer />
        </div>
    );
}