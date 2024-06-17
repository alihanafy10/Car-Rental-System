import { ObjectId } from "mongodb";
import { db } from "../../db/db.connection.js"
import bcrypt from "bcrypt"

const collection = db.collection("customer");
   
const addCustomer =async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        const isEmailExist = await collection.findOne({ email })
        if (isEmailExist) {
            return res.json({ message: "error email Exist" });
         }
         const hash= bcrypt.hashSync(password, 8);
        const data = await collection.insertOne({ name, email, password:hash, phone });
        res.json({ message: "success", data })
    } catch (err) {
        console.log(err);
     }
}

const signin = async(req, res) => {
    try {
        const { email, password } = req.body;
    const emailExist = await collection.findOne({ email })
    if (!emailExist) {
        return res.json({ message: "email or password orady exist" })
    }
    
    const compHash = bcrypt.compareSync(password, emailExist.password);
    if (!compHash) { 
        return res.json({ message: "email or password orady exist" });
    }
    res.json({message:"success",id:emailExist._id})
    } catch (err) {
        console.log(err);
    }
}

const getAllCustomers = async (req, res) => {
    try {
        const data = await collection
      .find({}, { projection: { name: 1, email: 1, phone: 1 } })
      .toArray();
    res.json({ data })
    } catch (err) {
        console.log(err);
    }
}

const getCustomer = async (req, res) => {
    try {
        const id = req.params.id
    const data = await collection
      .findOne({_id:new ObjectId(`${id}`)}, { projection: { name: 1, email: 1, phone: 1, _id: 0 } })
    res.json({ data });
    } catch (err) {
        console.log(err);
   }
 }

const updateCustomer = async (req, res) => {
    try {
         const { name, email, password, phone } = req.body;
         const isEmailExist = await collection.findOne({ email });
         if (isEmailExist) {
           return res.json({ message: "error email Exist" });
        }

        const hash = bcrypt.hashSync(password, 8);
        let data = await collection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: { name, email, password: hash, phone } }
        );
        res.json({message: "success",data});
    } catch (err) {
        console.log(err);
        
}
}
const deleteCustomer = async(req, res) => {
     try {
        
        let data = await collection.deleteOne(
          { _id: new ObjectId(req.params.id) },
        );
        res.json({message: "success",data});
    } catch (err) {
        console.log(err);
        
}
 }
 


export {
  addCustomer,
  signin,
  getAllCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
};
