import express from 'express';
import App from "./services/ExpressApp"
import dbConnection from "./services/Database";


const StartServer = async () => {
    const app = express();
    await dbConnection();
    await App(app);
   
   await app.listen(8000,()=>{
    console.log("Server is running on port 8000");
   })
}

StartServer()
