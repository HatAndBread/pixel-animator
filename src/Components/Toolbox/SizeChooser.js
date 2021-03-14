import '../../Styles/Toolbox/Toolbox.css';
import { GlobalContext } from '../../App';
import { useContext } from 'react';

export default function SizeChooser() {
  const context = useContext(GlobalContext);

  const handleInput = (e) => {
    context.setPencilSize(e.target.value);
  };
  return (
    <div className="size-chooser-container">
      <label htmlFor="size-chooser">
        {context.tool.toUpperCase()} SIZE: {context.pencilSize}
      </label>
      <input
        type="range"
        name="size-chooser"
        id="size-chooser"
        defaultValue={1}
        max={10}
        min={1}
        onChange={handleInput}
      />
    </div>
  );
}
