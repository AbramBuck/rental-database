// backend/routes/api/session.js
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser,requireAuth } = require('../../utils/auth');
const { Review, ReviewImage, Spot, User, SpotImage } = require('../../db/models');
const router = express.Router();


/////////////////////
async function getPreviewImage(spotId){
  const image = await SpotImage.findOne({where:{spotId},
  attribues:['url']});
  if (image){
    return image.url;
  } else{
    return null;
  }
}


//Get all Reviews of the Current User
router.get('/current',requireAuth, async (req, res) => {
    //console.log(req.user.dataValues.id);
    
    const loggedInUserId = req.user.dataValues.id;
    try {
    const reviews = await Review.findAll({
      where: {
        userId: loggedInUserId
    },
    include: [
        {
            model: User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName']
        },
        {
            model: Spot,
            as: 'spot',
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
        },
        {
            model: ReviewImage,
            as: "reviewImages",
            attributes: ['id', 'url']
        }
    ]
});

    // const spotIds = spots.id; // Get the spot ids from the spots call
    // console.log(spotIds);
    

    const formattedReviews = [];

   
    for (const review of reviews) {
      const spot = review.spot;
        const previewImage = await getPreviewImage(spot.id); 

        const formattedReview = {
          id: review.id,
          userId: review.userId,
          spotId: review.spotId,
          review: review.review,
          stars: review.stars,
          createdAt: review.createdAt,
          updatedAt: review.updatedAt,
          User: {
              id: review.user.id, 
              firstName: review.user.firstName,
              lastName: review.user.lastName
          },
          Spot: {
              id: spot.id,
              ownerId: spot.ownerId,
              address: spot.address,
              city: spot.city,
              state: spot.state,
              country: spot.country,
              lat: spot.lat,
              lng: spot.lng,
              name: spot.name,
              price: spot.price,
              previewImage: previewImage
          },
          ReviewImages: review.reviewImages 
      };

   
      formattedReviews.push(formattedReview);
  }

    res.status(200).json({ Reviews: formattedReviews });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
}
});
  
  
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Get all the Spots
  
    router.get(
        '/', async (req, res) => {
        try{
  
          const spots = await Spot.findAll();
          res.status(200).json(spots);
  
        } catch (error) {
  
          console.error(error);
          res.status(500).json({message:'error'});
  
        } 
      }
    );
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   //Create a Review for a Spot based on Spot's id
  
//   router.post('/:spotId',requireAuth, async (req, res) => {
//     const { spotId } = req.params; 
//     const loggedInUserId = req.user.dataValues.id;

//     try {
//       const {review, stars} = req.body;
  
//       if (!review || !stars ) {
//         return res.status(400).json({message: 'All fields are required.'});
//       }
//       const newReview = await Review.create({ spotId, userId:loggedInUserId, review, stars});
//         res.status(201).json(newReview);
  
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error:'Internal Server Error' });
//     }
  
  
  
  
//   });
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   //REMOVE FROM REVIEWS 
  
    router.get(
      '/:spotId', async (req, res) => {
        const {spotId} = req.params;
  
          const spots = await Spot.findAll({
            where: {id: spotId}
          });
  
       if (spots.length ===0){
        return res.status(404).json({message: "Spot couldn't be found"})
       }
          res.status(200).json(spots);
      }
    );
  
  
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Edit a Review
  
    router.put('/:reviewId',requireAuth,handleValidationErrors, async (req,res,next)=>{
      const {reviewId} = req.params;
      const { review, stars } = req.body;
      const loggedInUserId = req.user.dataValues.id;
      const  updatedData = {};  
      const errors = {};

      // Field validation
      if (!review) errors.review = "Review text is required";
      if (!stars || isNaN(stars) || stars < 1 || stars > 5) errors.stars = "Stars must be an integer from 1 to 5";
       
      if (Object.keys(errors).length > 0) {
        return res.status(400).json({ message: "Bad Request", errors });
      }

      //Put Updated Data into an object
      if (review !== undefined) updatedData.review = review;
      if (stars !== undefined) updatedData.stars = stars;
  
      if (Object.keys(updatedData).length ===0 ){
        return res.status(400).json({message: "Body validation errors"});
      }

      const reviewExists = await Review.findOne({
        where: {
          id: Number(reviewId)
        }
        });

        if (!reviewExists){
          return res.status(404).json({message: 'Review couldn\'t be found'});
        }
        
        try {
          if (loggedInUserId === reviewExists.userId) {
            await Review.update(updatedData, {
              where:{ id: reviewId }
            });
            return res.status(200).json(reviewExists);
          }else {
            const err = new Error('Forbidden');
            err.status = 403;
            err.errors = { message: 'Body validation error' };
            return next(err);
          }
         } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal server error'});
         }


    });
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Delete a Review
  
  router.delete('/:reviewId',requireAuth,handleValidationErrors, async (req, res, next) => {
    const { reviewId } = req.params;
    const loggedInUserId = req.user.dataValues.id;
  
    try {
      const reviewToDelete = await Review.findByPk(reviewId);
      const reviewOwner = reviewToDelete.userId;  

      if (!reviewToDelete) {
        return res.status(404).json({message: 'Review couldn\'t be found'});
      }

      // if current logged in user id is equal to review user id
      if (loggedInUserId === reviewOwner) {
        await reviewToDelete.destroy();
        return res.status(200).json({ message: 'Successfully deleted'});       
      } else {
        const err = new Error('Forbidden');
        err.status = 403;
        err.errors = { message: 'Body validation error' };
        return next(err);
      }

    } catch (error) {
  
      console.error(error);
      return res.status(404).json({ message: 'Review couldn\'t be found'});
    }
  
  });
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Add an IMAGE to a REVIEW based on Review's id
  
  router.post('/:reviewId/images',requireAuth,handleValidationErrors, async (req, res,next) => {
    const { reviewId } = req.params;
    const { url } = req.body;
    const loggedInUserId = req.user.dataValues.id;

    const reviewExists = await Review.findByPk(reviewId);
    if (!reviewExists){
      return res.status(404).json({message: "Review couldn't be found"});
    }

    // find all reviewImages entries by provided review id
    const numOfReviewImages = await ReviewImage.findAll({
        where: {
            reviewId:reviewId
        }
    })

    if (numOfReviewImages.length >= 10){ // see if there are more reviewImages than allowed
        return res.status(404).json({message: "Cannot add more than 10 images per resource"});
    }
    
    try {

      // Each review has a userId column

      if (loggedInUserId === reviewExists.userId) {
        const newReviewImage = await ReviewImage.create({ reviewId, url});
        //console.log(newReviewImage);
  
        createdImage = await ReviewImage.findOne({ 
          attributes: ['id','url'],
          where:{
              url: url
          }
      });
      } else {
        const err = new Error('Forbidden');
        err.status = 403;
        err.errors = { message: 'Body validation error' };
        return next(err);
      }
  
      
    res.status(201).json(createdImage);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error:'Internal Server Error' });
    }
  
  });

  ////////////////////////////////////////////////////////////////////////////////////////


module.exports = router;