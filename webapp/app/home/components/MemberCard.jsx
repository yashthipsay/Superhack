import React from 'react'

const MemberCard = ({imgSrc, info}) => {
  return (
    <div className='member-card'>
        <div className='member-card-image'>
          <img src={imgSrc} alt="" />
        </div>
        <div className="member-info"></div>

    </div>
  )
}

export default MemberCard