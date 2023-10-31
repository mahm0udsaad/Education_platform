"use server"
import { MongoClient } from "mongodb";

const URI= "mongodb+srv://mahmoud_saad:test1234@cluster0.ijknl.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(URI)

export const connectToDatabase =async () => {
     try{
        await client.connect()
        console.log('Connect to DB succesfully');
     }catch(err){
        console.error(err);
     }
};
export const getTestsName =async () => {
   "use server"
   await connectToDatabase()
    const collections = await client.db('tests').listCollections().toArray();
    const tests = collections.map((collection) => collection.name);
    return tests;
}
export const getTest= async(testName:string) => {
   await connectToDatabase()
   try {
      const database = client.db('tests'); 
      const collection = database.collection(testName);
      return collection.find({}).toArray();
    } catch (error) {
      console.error('Error getting collection:', error);
      return null;
    }
};
export const addQuiz= async(quiz : any) => {
   await connectToDatabase()
   try {
      const database = client.db('tests'); 
      const collection = database.collection(quiz.name);
      return collection.insertMany(quiz.data);
    } catch (error) {
      console.error('Error getting collection:', error);
      return null;
    }
};