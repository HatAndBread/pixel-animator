import '../../Styles/Toolbox/Toolbox.css';
import ToolboxIcon from './ToolboxIcon';
import pencilIconPath from '../../Assets/pencil.png';
import eraserIconPath from '../../Assets/eraser.png';
import dropperIconPath from '../../Assets/dropper.png';
import bucketIconPath from '../../Assets/paint-bucket.png';
import zoomInIconPath from '../../Assets/zoom-in.png';
import zoomOutIconPath from '../../Assets/zoom-out.png';
import SizeChooser from './SizeChooser';
import { GlobalContext } from '../../App';
import { useContext } from 'react';

export default function Toolbox() {
  const context = useContext(GlobalContext);
  const setTool = (tool) => {
    context.setTool(tool);
  };
  const handleChange = (e) => {
    context.setColor(e.target.value);
  };
  const handleMagnification = (num, out) => {
    const arr = [];
    if (out && context.magnification <= 1) {
    } else {
      for (let i = 0; i < context.frames.length; i++) {
        const copy = [...context.frames[i]];
        for (let j = 0; j < copy.length; j++) {
          copy[j].coords.x = (copy[j].coords.x * (context.magnification + num)) / context.magnification;
          copy[j].coords.y = (copy[j].coords.y * (context.magnification + num)) / context.magnification;
        }
        arr.push(copy);
      }

      context.setSquares(arr[[context.currentFrameNumber]]);
      context.setMagnification(context.magnification + num);
    }
  };

  return (
    <div className="toolbox-container">
      <div className="color-picker-container">
        <label htmlFor="color-picker">CURRENT COLOR</label>
        <input type="color" id="color-picker" onInput={handleChange} value={context.color} />
        <SizeChooser />
      </div>
      <ToolboxIcon src={pencilIconPath} alt={'pencil'} onClick={() => setTool('pencil')} />
      <ToolboxIcon src={eraserIconPath} alt={'eraser'} onClick={() => setTool('eraser')} />
      <ToolboxIcon src={dropperIconPath} alt={'dropper'} onClick={() => setTool('dropper')} />
      <ToolboxIcon src={bucketIconPath} alt={'bucket'} onClick={() => setTool('bucket')} />
      <ToolboxIcon src={zoomInIconPath} alt={'zoom in'} onClick={() => handleMagnification(1)} />
      <ToolboxIcon src={zoomOutIconPath} alt={'zoom out'} onClick={() => handleMagnification(-1, 'out')} />
    </div>
  );
}
