import React from 'react'

const TheGraph = () => {

    const styles = {
        width: "138.095px",
        height: "75.952px",
        flexShrink: "0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "4px"
    }

    const graphLogo = {
        width: '49.484px',
        height: '74.226px',
        flexShrink: '0'
    }

    const graphText = {
        width: '65.595px',
        height: '64.228px',
        flexShrink: '0',
    }




  return (
    <div style={styles}>
        <img style={graphLogo} src="./assets/the-graph/the-graph-logo" />
        <img style={graphText} src="./assets/the-graph/the-graph-text" />
    </div>
  )
}

export default TheGraph