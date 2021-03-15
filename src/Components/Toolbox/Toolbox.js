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
      <ToolboxIcon
        src={zoomInIconPath}
        alt={'zoom in'}
        onClick={() => context.setMagnification(context.magnification + 1)}
      />
      <ToolboxIcon
        src={zoomOutIconPath}
        alt={'zoom out'}
        onClick={() => {
          if (context.magnification > 1) {
            context.setMagnification(context.magnification - 1);
          }
        }}
      />
    </div>
  );
}
