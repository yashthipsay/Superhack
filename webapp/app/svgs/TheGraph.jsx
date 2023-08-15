import React from 'react'

const TheGraph = () => {

    const styles = {
        width: '138.095px',
        height: '75.952px',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '3.452px',
        background: '#D9D9D9'
    }

    const graphLogo = {
        width: '49.484px',
        height: '74.226px',
        flexShrink: 0,
        backgroundImage: `url('logos/the-graph/the-graph-logo.png')`,
    }

    const graphText = {
        width: '65.595px',
        height: '64.228px',
        flexShrink: 0,
        backgroundImage: `url('logos/the-graph/the-graph-text.png')`,
    }


  return (
    <div style={styles}>
        <div style={graphLogo}/>
        <div style={graphText} />
    </div>
  )
}

export default TheGraph