import '../../Styles/Modal/Modal.css';
import cancelIconPath from '../../Assets/cancel.png';
import { GlobalContext } from '../../App';
import { useContext } from 'react';

export default function Modal({ content, hidden }) {
  const context = useContext(GlobalContext);
  const onClose = () => {
    context.setOpenModal(null);
  };
  return (
    <div>
      {!hidden && (
        <div className="modal-container">
          <div className="modal-box">
            <img className="modal-closer" src={cancelIconPath} alt="X" onClick={onClose} />
            <div className="modal-content">{content}</div>
          </div>
        </div>
      )}
    </div>
  );
}
