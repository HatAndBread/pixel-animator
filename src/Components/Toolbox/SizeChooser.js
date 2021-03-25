import '../../Styles/Toolbox/Toolbox.css';
import { GlobalContext } from '../../App';
import { useContext } from 'react';

export default function SizeChooser() {
  const context = useContext(GlobalContext);

  const handleInput = (e) => {
    context.setPencilSize(e.target.value);
  };
  const handleScissorsWidth = (e) => context.setScissorsWidth(parseInt(e.target.value, 10));
  const handleScissorsHeight = (e) => context.setScissorsHeight(parseInt(e.target.value, 10));

  return (
    <div className="size-chooser-container">
      {(context.tool === 'pencil' || context.tool === 'eraser') && (
        <div>
          <label htmlFor="size-chooser">
            {context.tool.toUpperCase()} SIZE: {context.pencilSize}
          </label>
          <input
            type="range"
            name="size-chooser"
            id="size-chooser"
            value={context.pencilSize}
            max={10}
            min={1}
            onChange={handleInput}
          />
        </div>
      )}
      {context.tool === 'scissors' && (
        <div>
          <label htmlFor="scissors-width-chooser">WIDTH: {context.scissorsWidth}</label>
          <input
            type="range"
            name="scissors-width-chooser"
            id="scissors-width-chooser"
            value={context.scissorsWidth}
            max={context.width}
            min={1}
            onChange={handleScissorsWidth}
          />
          <label htmlFor="scissors-height-chooser">HEIGHT: {context.scissorsHeight}</label>
          <input
            type="range"
            name="scissors-height-chooser"
            id="scissors-height-chooser"
            value={context.scissorsHeight}
            max={context.height}
            min={1}
            onChange={handleScissorsHeight}
          />
        </div>
      )}
    </div>
  );
}
