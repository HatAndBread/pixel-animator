import { useContext } from 'react';
import { GlobalContext } from '../../App';
import Modal from '../Modal/Modal';

export default function Settings() {
  const context = useContext(GlobalContext);
  const toggleTransparentBackgroundColor = context.toggleTransparentBackgroundColor;
  const modalContent = (
    <div className="settings-container">
      <form>
        <div onChange={toggleTransparentBackgroundColor}>
          <label htmlFor="light">
            LIGHT BACKGROUND:
            <input type="radio" name="bg-mode" id="light" value="light" defaultChecked />
          </label>
          <label htmlFor="dark">
            DARK BACKGROUND:
            <input type="radio" name="bg-mode" id="dark" value="dark" />
          </label>
        </div>
      </form>
    </div>
  );
  return <Modal content={modalContent}></Modal>;
}
