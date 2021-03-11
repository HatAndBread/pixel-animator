import '../../Styles/Modal/Modal.css';
import cancelIconPath from '../../Assets/cancel.png';

export default function Modal({ content, onClose }) {
  return (
    <div className="modal-container">
      <img className="modal-closer" src={cancelIconPath} alt="X" onClick={onClose} />
      {content}
      <div className="modal-box"></div>
    </div>
  );
}
