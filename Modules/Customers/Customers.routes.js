import { Router } from "express";
import {addCustomer, deleteCustomer, getAllCustomers, getCustomer, signin, updateCustomer} from "./Customers.controller.js";


const customerRouter = Router();

customerRouter.post("/signup", addCustomer);
customerRouter.post("/signin", signin);
customerRouter.get("/customers", getAllCustomers);
customerRouter.get("/customer/:id", getCustomer);
customerRouter.put("/customer/:id", updateCustomer);
customerRouter.delete("/customer/:id", deleteCustomer);

export default customerRouter;
