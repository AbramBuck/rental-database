import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import {deleteReview, selectReviews}from '../../store/reviewActions';
import '../../components/DeleteConfirmModal/DeleteConfirmModal.css';

function DeleteReviewModal({ reviewId, spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const reviews = useSelector(selectReviews);
  
  
  const handleDelete = (reviewId) => {    
      dispatch(deleteReview(reviewId, spotId)); 
      closeModal();
      reviews.filter(review => review.id !== reviewId);
      //window.location.reload();
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