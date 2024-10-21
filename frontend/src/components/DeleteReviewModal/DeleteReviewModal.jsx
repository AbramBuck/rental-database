import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteReview } from '../../store/reviewActions';
import '../../components/DeleteConfirmModal/DeleteConfirmModal.css';

function DeleteReviewModal({ reviewId }) {
const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = (reviewId) => {
      

    try {
    console.log('reviewId:',reviewId,'===================');
      dispatch(deleteReview(reviewId)); 
      closeModal();
      window.location.reload();
    } catch (error) {

      throw new Error("Error when trying to delete a review.");
    }
  };

  return (
    
    <div className='shiny-metal-bg'>
      <h1 className='titleText'>Confirm Delete</h1>
      <h2 className='subhead'>Are you sure you want to remove this review?</h2>
      <div className='buttonDiv'>
        <button className='closeBtn' type="submit" onClick={() => closeModal()}>{"No (Keep Review)"}</button>
        <button type='button' onClick={() => handleDelete(reviewId)}>{"Yes (Delete Review)"}</button>
      </div>
    </div>
    
  );
}

export default DeleteReviewModal;