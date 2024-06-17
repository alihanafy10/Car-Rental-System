import { MongoClient } from "mongodb"

const client = new MongoClient(
  "mongodb+srv://engali1030:0DdPpc4IcKQMj5nC@kato.ixssyb0.mongodb.net/"
);



client.connect().then(() => {
  console.log("db Connected successfully to server");
}).catch(err => console.log(err))
 export const db = client.db("Car_Rental_System");
