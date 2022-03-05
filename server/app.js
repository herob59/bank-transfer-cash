import express from 'express';

import  path from 'path';
import { fileURLToPath } from 'url';
// import { dirname } from 'path';
import userRoutes from './routes/UsersRoute.js';
import profileRoute from './routes/ProfileRoute.js';
import transactionRoute from './routes/TransactionRoute.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import MyProfile from './controllers/ProfileController.js';
import UsersController from './controllers/AuthController.js';
import TransactionController from './controllers/TransactionController.js';
import privateRoute from './middlewares/verifyToken.js';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use(cors({
    "origin": "*"
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
// app.use(express.json());




app.use (function(req, res, next){
    res.header("Access-control-allow-Origin: https://api.fastforex.io//fetch-all?from=USD&api_key=5f6ab60ba9-d44a729976-r86raz")
    res.header("Access-control-allow-Headers", "X-Requested-With")
    next()

})



app.get("/", (req, res) =>
    res.status(200).send("Hello from server!"));
 
    
    // app.post('api/users', (req,res) => {
    //     res.status(200).send("i have registered")
    //     console.log('')
    // })

app.post('/api/register',UsersController.saveUser);
app.post('/api/login', UsersController.userLogin);
app.get('/api/users',  privateRoute.authUser , UsersController.getUsers);
app.get('/api/profile', privateRoute.authUser , MyProfile.me);
app.post('/api/transaction', privateRoute.authUser ,TransactionController.send);
app.get('/api/history', privateRoute.authUser ,TransactionController.GetAllTransactions)

app.use('/api/register', userRoutes)
app.use('/api/profileRoute',  profileRoute);
app.use('/api/transactionRoute',  transactionRoute);


export default app;