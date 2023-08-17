import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRouter from './routers/userRouter.js'
import productRouter from './routers/productRouter.js'
import dotenv from 'dotenv'
import { Router } from 'express'
import orderRouter from './routers/orderRouter.js'
import { createProxyMiddleware } from 'http-proxy-middleware';



dotenv.config();
express.Router();
// Router.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
const app = express()
const port = 5000;
const connection_url = process.env.MONGO_URL;

mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})



app.use(express.json());
// var cors = require('cors')

// app.use(cors()) // Use this after the variable declaration

// app.use(cors());
const corsOrigin ={
    origin:'http://localhost:3000', //or whatever port your frontend is using
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOrigin));


// app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'http://localhost:3000',
//       changeOrigin: true,
//       pathRewrite: {
//         '^/api': '', // Remove '/api' from the request path
//       },
//     })
//   );

  

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.get('/api/config/paypal', (req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
})

app.get('/',(req,res)=>res.status(200).send('Hello Debjit here. It is Amazon clone project.'))


// Listening to  server

app.listen(port,()=>console.log(`Listening on local host:${port}`))
