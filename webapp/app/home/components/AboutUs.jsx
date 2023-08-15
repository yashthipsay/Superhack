import React from 'react'

import './aboutus.css'

import MemberCard from './MemberCard.jsx';
import PieChart from '../../dashboard/components/GraphOne';

const AboutUs = () => {



  return (
    <div className='about-us-body'>

      
        <div className="about-us-header">ABOUT US</div>

      <div className="arrange-member-cards">
        <MemberCard imgSrc={'images/yash.jpeg'} info={'Yash Thipsay'} />
        <MemberCard imgSrc={'images/bhavya.jpeg'} info={'Bhavya Shah'} />
        <MemberCard imgSrc={'images/shreyash.jpeg'} info={'Shreyash Bele'} />
        <MemberCard imgSrc={'images/soham.jpeg'} info={'Soham Panchal'} />
      </div>
    </div>
  )
}

export default AboutUs