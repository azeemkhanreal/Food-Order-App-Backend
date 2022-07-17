import express,{ Request,Response,NextFunction } from "express";
import { getFoodAvailability, getFoodsIn30Min, getTopRestaurants, restaurantById, searchFoods } from "../controllers";

const router = express.Router();


/**---------------------- Food Availability -------------------  */ 
router.get("/:pincode",getFoodAvailability);

/**---------------------- Top Restaurants -------------------  */ 
router.get("/top-restaurants/:pincode",getTopRestaurants);

/**---------------------- Food Available in 30 Minute -------------------  */ 
router.get("/foods-in-30-min/:pincode",getFoodsIn30Min);

/**---------------------- Search Food -------------------  */ 
router.get("/search/:pincode",searchFoods);

/**---------------------- Find Restaurant by id -------------------  */ 
router.get("/search/:pincode",restaurantById);




export {router as ShoppingRoute};