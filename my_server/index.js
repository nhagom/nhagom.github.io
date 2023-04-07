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

//api product
app.get("/products", cors(), async (req,res)=>{
    const result = await productsCollection.find({}).toArray();
    res.send(result)
})
    
    app.get("/products/:id", cors(), async (req, res)=>{
        var productId = new ObjectId(req.params["id"]);
        const result = await productCollection.find({_id:productId}).toArray(); 
        res.send(result[0])
    })
    
    app.get("/products-detail/:detail", cors(), async (req, res)=>{
        var o_detail = new ObjectId(req.params["detail"]);
        const result = await fashionCollection.find({detail:o_detail}).toArray(); 
        res.send(result[0])
    })

//api profuct

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

//api update thông tin customer
app.put("/customers", cors(), async (req,res)=>{
    await customersCollection.updateOne(
        {_id:new ObjectId(req.body._id)},
        { $set: { 
            

        }}
    )
    res.send(result)
})

