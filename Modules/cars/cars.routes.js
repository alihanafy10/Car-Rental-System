import { Router } from "express";
import { addCar, deleteCar, getAllCar, getAllCarByName, getAllRentalOrAvilableCars, getSCar, updateCar } from "./cars.controller.js";


const carRouter = Router();

carRouter.post("/car",addCar)
carRouter.get("/car",getAllCar)
carRouter.get("/car/:id",getSCar)
carRouter.put("/car/:id",updateCar)
carRouter.delete("/car/:id",deleteCar)
carRouter.get("/carName",getAllCarByName)
carRouter.get("/AllRentalOrAvilableCars", getAllRentalOrAvilableCars);

export default carRouter;
