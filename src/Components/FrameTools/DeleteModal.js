import Modal from '../Modal/Modal';
import { useContext } from 'react';
import { GlobalContext } from '../../App';

export default function DeleteModal() {
  const context = useContext(GlobalContext);

  const modalContent = (
    <div>
      <div className="text-content">Do you really want to delete this frame?</div>
      <div className="delete-modal-buttons" style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={() => {
            context.modalCallbacks.delete();
            context.setOpenModal(null);
          }}
        >
          Delete
        </button>
        <button
          onClick={() => {
            context.setOpenModal(null);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
  return <Modal content={modalContent} />;
}
