'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Loader, Suspense, OrbitControls, CameraControls } from '@react-three/drei'

import './canvasbg.css'


import React from 'react'

import {Model} from '../models/Model.jsx'

const CanvasBG = () => {

  // const [cameraPosition, setCameraPosition] = useState([0, 0, 3]);


  return (
    
    <Canvas style={{'zIndex':'0',  'position':'fixed', 'width':'100vw', 'height':'100vh'}} className="threed-canvas">   
      <OrbitControls />
      
      <Model />
      {/* <Loader 
        containerStyles={{"background":"linear-gradient(134.33deg, #FF6CAB 1.14%, #7366FF 100%)"}}
        innerStyles={{"height":"10px", "width":"500px", "border-radius":"12px"}}
        barStyles={{"height":"10px", "width":"500px", "border-radius":"12px", "background-color":"#dab3ff"}}
        dataStyles={{"font-size":"20px", "font-weight":"1000", "font-family":"monaco", "color":"#e6b3ff", "text-decoration":"underline"}}
        dataInterpolation={(p) => `Loading ${p.toFixed(2)}%`}
      /> */}
    </Canvas>
    
  )
}

export default CanvasBG