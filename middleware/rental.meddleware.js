import { ObjectId } from "mongodb"
import { db } from "../db/db.connection.js"

const isCarAvilable = async(req, res, next) => {
    try {
      const { carId } = req.body;
      const data = await db
        .collection("car")
        .findOne({ _id: new ObjectId(carId) });
      if (data.rentalStatus == "available") {
        next();
      } else {
        res.json({ message: "this car is not available" });
      }
    } catch (err) {
      console.log(err);
    }
}
const toAvailableCar = async (req, res, next) => {
    try {
        const id = req.params.id
    const dataCar = await db.collection("rental").findOne({ _id: new ObjectId(id) })
    await db.collection("car").updateOne(
      { _id: new ObjectId(dataCar.carId) },
      {
        $set: {
          rentalStatus: "available",
        },
      }
    );
    next()
    } catch (err) {
        console.log(err);
    }
};
export { isCarAvilable, toAvailableCar };