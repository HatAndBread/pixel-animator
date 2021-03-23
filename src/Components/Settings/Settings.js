import { useContext } from 'react';
import { GlobalContext } from '../../App';
import Modal from '../Modal/Modal';
import '../../Styles/Settings/Settings.css';

export default function Settings() {
  const context = useContext(GlobalContext);
  const setTransparentBackgroundColor = context.setTransparentBackgroundColor;
  const handleWidthChange = (e) => {
    context.setWidth(parseInt(e.target.value));
  };
  const handleHeightChange = (e) => context.setHeight(parseInt(e.target.value));
  const getOptions = () => {
    const options = [];
    for (let i = 2; i <= 64; i++) {
      if (i % 2 === 0) {
        options.push(i);
      }
    }
    return options;
  };
  const modalContent = (
    <div className="settings-container">
      <form>
        <div className="settings-form-label">CANVAS DIMENSIONS</div>
        <label htmlFor="canvas-width">WIDTH:</label>
        <select name="canvas-width" id="canvas-width" onChange={handleWidthChange} defaultValue={context.width}>
          {getOptions().map((num) => {
            return (
              <option key={num} value={num}>
                {num}
              </option>
            );
          })}
        </select>
        <label htmlFor="canvas-height">HEIGHT:</label>
        <select name="canvas-height" id="canvas-height" onChange={handleHeightChange} defaultValue={context.height}>
          {getOptions().map((num) => {
            return (
              <option key={num} value={num}>
                {num}
              </option>
            );
          })}
        </select>
        <div className="settings-form-label">BACKGROUND TRANSPARENCY</div>
        {context.transparentBackgroundColor === 'LIGHT' ? (
          <div
            onChange={(e) => {
              setTransparentBackgroundColor(e.target.value);
            }}
            className="settings-radios"
          >
            <label htmlFor="light">
              LIGHT:
              <input type="radio" name="bg-mode" id="light" value="LIGHT" defaultChecked />
            </label>
            <label htmlFor="dark">
              DARK:
              <input type="radio" name="bg-mode" id="dark" value="DARK" />
            </label>
          </div>
        ) : (
          <div
            onChange={(e) => {
              setTransparentBackgroundColor(e.target.value);
            }}
            className="settings-radios"
          >
            <label htmlFor="light">
              LIGHT:
              <input type="radio" name="bg-mode" id="light" value="LIGHT" />
            </label>
            <label htmlFor="dark">
              DARK:
              <input type="radio" name="bg-mode" id="dark" value="DARK" defaultChecked />
            </label>
          </div>
        )}
        <button
          onClick={() => {
            context.setOpenModal(null);
          }}
        >
          OK
        </button>
      </form>
    </div>
  );
  return <Modal content={modalContent}></Modal>;
}
