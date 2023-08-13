'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from '@react-three/drei'

import './canvasbg.css'


import React from 'react'

import {Model} from '../models/Model.jsx'

const CanvasBG = () => {
  return (
    
    <Canvas style={{'position':'fixed', 'width':'100vw', 'height':'100vh'}} className="threed-canvas" camera={{ position: [0, 2, 5] }}>   
      <Model />
    </Canvas>
    
  )
}

export default CanvasBG