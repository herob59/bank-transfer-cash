import app from './app.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const port = process.env.PORT || 8000;

mongoose.connect(process.env.REACT_APP_ACCESS_KEY,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Database Connected Successfully"))
.catch(err => console.log(err));

app.listen(port, ()=> {
    console.log(`Server Started on Port ${port}`);
});

export default app;