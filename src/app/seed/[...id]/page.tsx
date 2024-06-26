"use client"
import React, { useRef, useState } from 'react'
import {
  BabylonNode,
  // Engine,
  FiberBoxPropsCtor,
  FiberMeshProps,
  Scene,
  useBeforeRender,
  useClick,
  useHover,
  useScene,
  WebGPUEngine
} from 'react-babylonjs'
import { Vector3, Color3 } from '@babylonjs/core';
import './style.scss'

const DefaultScale = new Vector3(1, 1, 1)
const BiggerScale = new Vector3(1.25, 1.25, 1.25)

const SpinningBox = (props: any) => {
  // access Babylon scene objects with same React hook as regular DOM elements
  const boxRef = useRef<any>(null)

  const [clicked, setClicked] = useState(false)
  useClick(() => setClicked((clicked) => !clicked), boxRef)

  const [hovered, setHovered] = useState(false)
  useHover(
    () => setHovered(true),
    () => setHovered(false),
    boxRef
  )

  // This will rotate the box on every Babylon frame.
  const rpm = 5
  useBeforeRender((scene) => {
    if (boxRef.current) {
      // Delta time smoothes the animation.
      var deltaTimeInMillis = scene.getEngine().getDeltaTime()
      boxRef.current.rotation.y +=
        (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000)
    }
  })

  return (
    <box
      name={props.name}
      ref={boxRef}
      size={2}
      position={props.position}
      scaling={clicked ? BiggerScale : DefaultScale}
    >
      <standardMaterial
        name={`${props.name}-mat`}
        diffuseColor={hovered ? props.hoveredColor : props.color}
        specularColor={Color3.Black()}
      />
    </box>
  )
}

const SceneWithSpinningBoxes = () => {
  const scene = useScene();
  useBeforeRender(() => {
    if (scene) {

    }
  })
  return <div>
    <WebGPUEngine canvasId="babylonJS">
      <Scene>
        <freeCamera
          name='freecam'
          position={new Vector3(0, 5, -10)}
          setTarget={[Vector3.Zero()]}
        />
        <hemisphericLight
          name="light1"
          intensity={0.7}
          direction={Vector3.Up()}
        />
        <SpinningBox
          name="left"
          position={new Vector3(-2, 0, 0)}
          color={Color3.FromHexString('#EEB5EB')}
          hoveredColor={Color3.FromHexString('#C26DBC')}
        />
        <SpinningBox
          name="right"
          position={new Vector3(2, 0, 0)}
          color={Color3.FromHexString('#C8F4F9')}
          hoveredColor={Color3.FromHexString('#3CACAE')}
        />
      </Scene>
    </WebGPUEngine>
  </div>
}

export default SceneWithSpinningBoxes;