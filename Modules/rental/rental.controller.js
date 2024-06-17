import { ObjectId } from "mongodb";
import { db } from "../../db/db.connection.js";

const collection = db.collection("rental");

const createRental = async(req, res,next) => {
    try {
        const { customerId, carId,rentalDate, returnDate } = req.body;
        
    const data = await collection.insertOne({
      customerId:new ObjectId(customerId),
      carId:new ObjectId(carId),
      rentalDate,
      returnDate,
    });
    await db.collection("car").updateOne(
      { _id: new ObjectId(carId) },
      {
        $set: {
          rentalStatus: "rented",
        },
      }
    );
    res.json({ message: 'success', data })
    } catch (err) {
        console.log(err);
   }
    
}

const updateRental = async(req, res) => {
    try {
      const { carId, rentalDate, returnDate } = req.body;
      const data = await collection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { carId, rentalDate, returnDate } }
      );
      await db.collection("car").updateOne(
        { _id: new ObjectId(carId) },
        {
          $set: {
            rentalStatus: "rented",
          },
        }
      );
      res.json({ message: "success", data });
    } catch (err) {
      console.log(err);
    }
}

const deleteRental =async (req, res) => {
    try {
      const data = await collection.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      res.json({ message: "success", data });
    } catch (err) {
      console.log(err);
    }
}

const getAllRental = async (req, res) => {
    try {
       
      const data = await collection
        .aggregate([
          {
            $lookup: {
              from: "customer",
              localField: "customerId",
              foreignField: "_id",
              as: "customer",
            },
          },
          {
            $lookup: {
              from: "car",
              localField: "carId",
              foreignField: "_id",
              as: "car",
            },
          },
        ])
        .toArray();

        
      res.json(data);
    } catch (err) {
      console.log(err);
    }
}
 
const getSRental =async (req, res) => {
      try {
       
      const data = await collection
          .aggregate([
              {
          $match:{_id:new ObjectId(req.params.id)}  
        },
          {
            $lookup: {
              from: "customer",
              localField: "customerId",
              foreignField: "_id",
              as: "customer",
            },
          },
          {
            $lookup: {
              from: "car",
              localField: "carId",
              foreignField: "_id",
              as: "car",
            },
          },
        ])
        .toArray();

        
      res.json(data);
    } catch (err) {
      console.log(err);
    }
}
export { createRental, updateRental, deleteRental, getAllRental, getSRental };
