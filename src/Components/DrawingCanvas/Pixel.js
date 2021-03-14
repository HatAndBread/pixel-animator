import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../App';

function Pixel({ type, x, y, style, color }) {
  const project = useContext(GlobalContext).currentProject;
  const currentFrameNumber = useContext(GlobalContext).currentFrameNumber;
  const [myStyle, setMyStyle] = useState(style);
  useEffect(() => {
    if (project.frames[currentFrameNumber]?.dataArr[y][x] !== 'transparent') {
      setMyStyle({ backgroundColor: project.frames[currentFrameNumber].dataArr[y][x] });
    }
  }, [project, currentFrameNumber, x, y]);

  return <div className={type} data-x={x} data-y={y} data-original-bg-color={color} style={myStyle}></div>;
}

export default Pixel;
