import Settings from '../../Components/Settings/Settings';
import DeleteModal from '../FrameTools/DeleteModal';
import { GlobalContext } from '../../App';
import { useContext } from 'react';

export default function Modals() {
  const context = useContext(GlobalContext);
  const getModal = () => {
    switch (context.openModal) {
      case 'SETTINGS':
        return <Settings />;
      case 'DELETE':
        return <DeleteModal />;
      default:
        return '';
    }
  };
  return getModal();
}
