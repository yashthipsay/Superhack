import React from 'react'

const MemberCard = ({imgSrc, info}) => {
  return (
    <div className='member-card'>
        <div className='member-card-image'>
          <img src={imgSrc} alt="" className='mem-img' />
        </div>
        <div className="member-info">{info}</div>

    </div>
  )
}

export default MemberCard