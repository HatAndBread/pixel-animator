import Settings from '../../Components/Settings/Settings';
import DeleteModal from '../FrameTools/DeleteModal';
import Save from '../Save/Save';
import About from '../About/About';
import Open from '../Open/Open';

import { GlobalContext } from '../../App';
import { useContext } from 'react';

export default function Modals() {
  const context = useContext(GlobalContext);
  const getModal = () => {
    switch (context.openModal) {
      case 'SETTINGS':
        return <Settings />;
      case 'OPEN':
        return <Open />;
      case 'DELETE':
        return <DeleteModal />;
      case 'SAVE':
        return <Save />;
      case 'ABOUT':
        return <About />;
      default:
        return '';
    }
  };
  return getModal();
}
