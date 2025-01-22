const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const mongoURI = process.env.MONGO_URI;


const mongoDB =async() => {
    try {
        await mongoose.connect(mongoURI);
    
        console.log("connected to database");

        const fetched_data = await mongoose.connection.db.collection("food_items");
        //console.log("Fetched collection:", fetched_data.collectionName);

        
        const data = await fetched_data.find({}).toArray();
        if (data.length === 0) {
            console.log("No documents found in the collection.");
        } else {
            global.food_items = data;
            //console.log("Food items data:", global.food_items);
        }
        const foodCategory = await mongoose.connection.db.collection("foodCategory");
        const catData= await foodCategory.find({}).toArray()
        if (data.length === 0) {
          console.log("No documents found in the collection.");
        } else {
          global.food_items = data;
          global.foodCategory = catData;
        }
        
        }catch (error) {
            console.log(error)
            } 
       
}

module.exports = mongoDB;