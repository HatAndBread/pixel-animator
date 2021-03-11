import { useState, useEffect, useRef, useContext } from 'react';
import { DrawingContext } from './DrawingCanvas';

export default function Pixel({ type, x, y }) {
  const mouseDown = useContext(DrawingContext).mouseDown;
  const [myColor, setMyColor] = useState({});
  const myRef = useRef();
  return <div className={type} ref={myRef} data-x={x} data-y={y}></div>;
}
