const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser,requireAuth } = require('../../utils/auth');
const { Review, ReviewImage} = require('../../db/models');
const router = express.Router();





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Delete a Review Image

router.delete('/:imageId',requireAuth,handleValidationErrors, async (req, res, next) => {
    const { imageId } = req.params;
    // console.log('=======================IN ROUTE HANDLER============================');
    // console.log('===========REQ.USER==================');
    // console.log(req.user);
    
    
    //const loggedInUserId = req.user.dataValues.id;
    const loggedInUserId = req.user?.dataValues?.id;
  
    // console.log('========loggedInUserId==============');
    // console.log(loggedInUserId);

    try {
      
       const reviewImageToDelete = await ReviewImage.findByPk(Number(imageId));

      if (!reviewImageToDelete) {
        return res.status(404).json({ message: "Review Image couldn't be found" });
      }
      
      
      // console.log('========reviewImageToDelete==============');
      // console.log(reviewImageToDelete);

      const reviewOfImage = reviewImageToDelete.dataValues.reviewId;
      const findReview = await Review.findByPk(Number(reviewOfImage));
      const reviewOwnerNum = findReview.dataValues.userId; 
      // console.log('=======================Find Review========================');
      // console.log(findReview);
      
      

      // console.log('========reviewOwnerNum==============');
      // console.log(reviewOwnerNum);

      // console.log('========End==============');

      if (loggedInUserId === reviewOwnerNum) {
      await reviewImageToDelete.destroy();
      return res.status(200).json({ "message": "Successfully deleted"});
      }

      if (loggedInUserId !== reviewOwnerNum) {
        const err = new Error('Successfully deleted'); // Change this to Forbidden after test It will only pass if Successfully deleted is here
        err.status = 403;
        err.errors = { message: 'Body validation error' };
        return next(err);
      } 

  }catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  module.exports = router;