import '../../Styles/Modal/Modal.css';
import cancelIconPath from '../../Assets/cancel.png';
import { GlobalContext } from '../../App';
import { useContext, useEffect } from 'react';

export default function Modal({ content, hidden }) {
  const context = useContext(GlobalContext);
  const setModalCallbacks = context.setModalCallbacks;
  const onClose = () => {
    context.setOpenModal(null);
  };
  useEffect(() => {
    return () => setModalCallbacks({});
  }, [setModalCallbacks]);
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
