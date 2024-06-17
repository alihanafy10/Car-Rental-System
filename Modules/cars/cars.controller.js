import { ObjectId } from "mongodb";
import { db } from "../../db/db.connection.js";

const collection = db.collection("car");

const addCar = async(req, res) => {
    try {
      const { name, model, rentalStatus } = req.body;
      const data = await collection.insertOne({ name, model, rentalStatus });
      res.json({ message: "success", data });
    } catch (err) {
      console.log(err);
    }
}

const getAllCar = async (req, res) => {
    try {
      const data = await collection.find({}).toArray();
      res.json(data);
    } catch (err) {
      console.log(err);
    }
}
const getSCar = async (req, res) => {
    try {
      const data = await collection
        .find(
          { _id: new ObjectId(req.params.id) },
          { projection: { _id: 0, name: 1, model: 1, rentalStatus: 1 } }
        )
        .toArray();
      res.json(data);
    } catch (err) {
      console.log(err);
    }
}
const updateCar = async (req, res) => {
    try {
      const { name, model, rentalStatus } = req.body;
    const data = await collection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: { name, model, rentalStatus } });
  res.json({ message: "success", data });
    } catch (err) {
        console.log(err);
  }
};
 

const deleteCar = async (req, res) => {
  try {
    const data = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ message: "success", data });
  } catch (err) {
    console.log(err);
  }
};

//Special APIs الخطوة دى يعتبر انا عامل اول 3 نقط في 
const getAllCarByName = async (req, res) => {
  try {
    if (req.query.available == "0") {
      const data = await collection
        .find({ name: req.query.name, rentalStatus: "rented" })
        .toArray();
      res.json({ data });
    } else if(req.query.available == "1") {
      const data = await collection
        .find({ name: req.query.name, rentalStatus: "available" })
        .toArray();
      res.json({ data });
    } else {
       const data = await collection
         .find({ name: req.query.name})
         .toArray();
       res.json({ data });
    }
  
  
  } catch (err) {
    console.error(err);
  }
}

const getAllRentalOrAvilableCars = async(req, res) => {
  if (req.query.available == '1') {
    const data=await collection.find({
      rentalStatus: "available"
    }).toArray();
    res.json(data);
  } else {
    const data = await collection
      .find({
        rentalStatus: "rented",
      })
      .toArray();
    res.json(data);
   }
 }
export {
  addCar,
  getAllCar,
  getSCar,
  updateCar,
  deleteCar,
  getAllCarByName,
  getAllRentalOrAvilableCars,
};