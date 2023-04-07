const express = require('express');
const app = express();
const port = 3004;

const morgan=require("morgan")
app.use(morgan("combined"))

const bodyParser=require("body-parser")
app.use(bodyParser.json({limit:'1000mb'}));
app.use(bodyParser.urlencoded({extended: true,limit:'1000mb'}));

app.use(express.json({limit:'1000mb'}));
app.use(express.urlencoded({limit:'1000mb'}));
app.use(express.json())


const cors=require("cors");
app.use(cors())

app.listen(port, ()=>{
    console.log(`My server listening on port ${port}`)
})

app.get("/", (req,res)=>{
    res.send("This Web server is processed for MongoDB")
})

// gọi mongodb
const { MongoClient, ObjectId } = require('mongodb');
client = new MongoClient("mongodb://127.0.0.1:27017");
client.connect();

database = client.db("gốm");

productsCollection = database.collection("products");
customersCollection = database.collection("customers");
ordersCollection = database.collection("orders");
blogsCollection = database.collection("blogs");
feedbacksCollection = database.collection("feedbacks")

// Xử lý khi dung lượng gửi lên serve lớn
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({extend: true, limit :'10mb'}));
app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({limit:'10mb'}));
app.use(express.json());

//api cơ bản
app.get("/products", cors(), async (req,res)=>{
    const result = await productsCollection.find({}).toArray();
    res.send(result)
})

app.get("/customers", cors(), async (req,res)=>{
    const result = await customersCollection.find({}).toArray();
    res.send(result)
})

app.get("/orders", cors(), async (req,res)=>{
    const result = await ordersCollection.find({}).toArray();
    res.send(result)
})

app.get("/blogs", cors(), async (req,res)=>{
    const result = await blogsCollection.find({}).toArray();
    res.send(result)
})

app.get("/feedbacks", cors(), async (req,res)=>{
    const result = await feedbacksCollection.find({}).toArray();
    res.send(result)
})

app.post("/customers",cors(),async(req,res)=>{
    //put json Register into database
    await customersCollection.insertOne(req.body)
    //send messege to client
    res.send(req.body)
})

//api gọi customer theo id
app.get("/customers/:id", cors(), async (req,res)=>{
    var id = req.params["id"]
    const result = await customersCollection.find({customerId:id}).toArray();
    res.send(result[0])
})

//api gọi lịch sử mua hàng theo customerid
app.get("/orders/:customerId", cors(), async (req,res)=>{
    var id = req.params["customerId"]
    const result = await ordersCollection.find({customerId:id}).toArray();
    res.send(result)
})

<<<<<<< HEAD
//api của product
app.get("/fashions/:id",cors(), async(req,res)=>{
    var o_id = new ObjectId(req.params["id"]);
    const result = await fashionCollection.find({_id:o_id}).toArray();
    res.send(result[0])
})
//this is API to get category of style
app.get("/fashions-get/:style",cors(), async(req,res)=>{
    const o_style = new RegExp(req.params.style,"i")
    const result = await fashionCollection.find({style:{$regex: o_style}}).toArray();
    res.send(result)
})


=======
//api update thông tin customer
app.put("/customers", cors(), async (req,res)=>{
    await customersCollection.updateOne(
        {_id:new ObjectId(req.body._id)},
        { $set: { 
            

        }}
    )
    res.send(result)
})

>>>>>>> a43f356a3a3f105b1b6d7cd7d2d71ed2dcb42e17
