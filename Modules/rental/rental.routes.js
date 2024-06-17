import { Router } from "express";
import { createRental, deleteRental, getAllRental, getSRental, updateRental } from "./rental.controller.js";
import { isCarAvilable, toAvailableCar } from "../../middleware/rental.meddleware.js";


const rentalRouter = Router();

rentalRouter.post('/rental',isCarAvilable,createRental)
rentalRouter.put("/rental/:id", toAvailableCar, updateRental);
rentalRouter.delete("/rental/:id", toAvailableCar, deleteRental);
rentalRouter.get("/rental",  getAllRental);
rentalRouter.get("/rental/:id",  getSRental);

export default rentalRouter;
