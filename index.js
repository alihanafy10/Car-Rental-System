import express from "express";
import customerRouter from "./Modules/Customers/Customers.routes.js";
import carRouter from "./Modules/cars/cars.routes.js";
import rentalRouter from "./Modules/rental/rental.routes.js";
import cors from "cors"

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());
app.use('/customer',customerRouter)
app.use('/car',carRouter)
app.use('/rental',rentalRouter)


app.listen(port, () => {
  console.log(`server is runing on port ${port}`);
});
