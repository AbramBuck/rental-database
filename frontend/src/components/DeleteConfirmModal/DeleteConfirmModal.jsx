import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteASpot } from '../../store/spotActions';
import '../../components/DeleteConfirmModal/DeleteConfirmModal.css';

function DeleteConfirmModal({ spot }) {
const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = (spot) => {
      

    try {
      dispatch(deleteASpot(spot.id)); 
      closeModal();
      window.location.reload();
    } catch (error) {

      throw new Error("Error when trying to delete a spot.");
    }
  };


  return (
    
    <div className='shiny-metal-bg'>
      <h1 className='titleText'>Confirm Delete</h1>
      <h2 className='subhead'>Are you sure you want to remove this spot from the listings?</h2>
      <div className='buttonDiv'>
        <button className='closeBtn' type="submit" onClick={() => closeModal()}>{"No (Keep Spot)"}</button>
        <button type='button' onClick={() => handleDelete(spot)}>{"Yes (Delete Spot)"}</button>
      </div>
    </div>
    
  );
}

export default DeleteConfirmModal;