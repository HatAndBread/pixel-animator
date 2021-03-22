import { useContext } from 'react';
import { GlobalContext } from '../../App';
import Modal from '../Modal/Modal';
import '../../Styles/Settings/Settings.css';

export default function Settings() {
  const context = useContext(GlobalContext);
  const setTransparentBackgroundColor = context.setTransparentBackgroundColor;
  const handleWidthChange = (e) => context.setWidth(parseInt(e.target.value));
  const handleHeightChange = (e) => context.setHeight(parseInt(e.target.value));
  const modalContent = (
    <div className="settings-container">
      <form>
        <div className="settings-form-label">CANVAS DIMENSIONS</div>
        <label htmlFor="canvas-width">WIDTH:</label>
        <input
          type="number"
          name="canvas-width"
          id="canvas-width"
          min="2"
          max="128"
          step="2"
          value={context.width}
          onChange={handleWidthChange}
        />
        <label htmlFor="canvas-height">HEIGHT:</label>
        <input
          type="number"
          name="canvas-height"
          id="canvas-height"
          min="2"
          max="128"
          step="2"
          value={context.height}
          onChange={handleHeightChange}
        />
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
