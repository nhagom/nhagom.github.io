const express = require('express');
const app = express();
const port = 3004;

const morgan=require("morgan")
app.use(morgan("combined"))

const bodyParser=require("body-parser")
app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({extended: true,limit:'100mb'}));

app.use(express.json({limit:'100mb'}));
app.use(express.urlencoded({limit:'100mb'}));
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

//api product
app.get("/products", cors(), async (req,res)=>{
    const result = await productsCollection.find({}).toArray();
    res.send(result)
})

app.get("/products/:id",cors(), async(req,res)=>{
    var o_id = new ObjectId(req.params["id"]);
    const result = await productsCollection.find({_id:o_id}).toArray();
    res.send(result[0])
})

  //this is API to get category of tag
    app.get("/products-get/:style",cors(), async(req,res)=>{
        const o_style = new RegExp(req.params.style,"i")
        const result = await productCollection.find({style:{$regex: o_style}}).toArray();
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
// API blogs
  // get all blogs
app.get("/blogs", cors(), async (req,res)=>{
    const result = await blogsCollection.find({}).toArray();
    res.send(result)
})
  // get 1 blog by id
app.get("/blogs/:id",cors(), async (req,res)=>{
    var id = req.params["id"]
    const result = await blogsCollection.find({blogId:id}).toArray();
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

//api gọi customer theo email
app.get("/customers/:email", cors(), async (req,res)=>{
    var email = req.params["email"]
    const result = await customersCollection.find({customerEmail:email}).toArray();
    res.send(result[0])
})

//api gọi lịch sử mua hàng theo customerid
app.get("/orders/:customerEmail", cors(), async (req,res)=>{
    var email = req.params["customerEmail"]
    const result = await ordersCollection.find({customerEmail:email}).toArray();
    res.send(result)
})

//api update thông tin customer
app.put("/customers/:customerEmail", cors(), async (req,res)=>{
    await customersCollection.updateOne(
        {customerEmail: req.params.customerEmail},
        { $set: { 
            customerName: req.body.customerName,
            customerEmail: req.body.customerEmail,
            customerPhoneNumb: req.body.customerPhoneNumb,
            customerBirth: req.body.customerBirth,
            customerAddress: req.body.customerAddress,
            customerGender: req.body.customerGender,
        }}
    )
    var email = req.body.customerEmail
    const result = await customersCollection.find({customerEmail:email}).toArray();
    res.send(result[0])
})
//-------------------------------API REGISTER , LOGIN------------------------------------------
//api thêm 1 customer (đăng ký)
app.post("/customers",cors(),async(req,res)=>{
    await customersCollection.insertOne(req.body)
    res.send(req.body)
})

//api kiểm tra email không tồn tại
app.get("/customers/check-email/:email", cors(), async (req, res) => {
    const email = req.params.email;
    const result = await customersCollection.findOne({ customerEmail: email });
  
    if (result) {
      res.send(true);
    } else {
      res.send(false);
    }
  });
//api kiểm tra email tồn tại
app.get("/customers/check-email-invalid/:email", cors(), async (req, res) => {
    const email = req.params.email;
    const result = await customersCollection.findOne({ customerEmail: email });
  
    if (result) {
      res.send(false);
    } else {
      res.send(true);
    }
  });
//api chỉnh sửa mật khẩu
app.put("/customers/:email", cors(),async(req,res) =>{
    await customersCollection.updateOne(
        {customerEmail:req.params.email},
        {$set :{
            password:req.body.password,
            customerBirth:customerBirth,
            customerAddress:customerAddress,
            customerGender:customerGender,
            customerName:customerName,
            customerPhoneNumb:customerPhoneNumb
        }}
    )
    var e_email = req.body.customerEmail;
    const result = await customersCollection.find({customerEmail:email}).toArray();
    res.send(result[0])
})
//api kiểm tra email, pass khi login
// const bcrypt = require('bcrypt');

