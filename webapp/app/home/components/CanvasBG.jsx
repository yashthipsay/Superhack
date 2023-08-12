import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'


import React from 'react'

import {Model} from '../models/Model.jsx'

const CanvasBG = () => {
  return (
    <Canvas className='threedenv-body'>
        <Suspense>
            <Model />
        </Suspense>
    </Canvas>
  )
}

export default CanvasBG