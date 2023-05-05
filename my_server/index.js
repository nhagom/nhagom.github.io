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
adminCollection = database.collection("admin")
feedbacksCollection = database.collection("feedbacks");

//----------------------------------API Chung--------------------------------------------
  app.get("/products", cors(), async (req,res)=>{
      const result = await productsCollection.find({}).sort({productId:'desc'}).toArray();
      result.forEach((item) => {
        const productDate = new Date(item.date);
        item.date = productDate;
      });
      result.sort((a, b) => b.date - a.date);
      result.forEach((item) => {
        item.date = item.date.toLocaleDateString('en-GB');
      });
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


//-----------------------------------API trang Product-----------------------------------------
  app.get("/products/:id",cors(), async(req,res)=>{
      var o_id = new ObjectId(req.params["id"]);
      const result = await productsCollection.find({_id:o_id}).toArray();
      res.send(result[0])
})


// API to get 10 newest products based on productDate
  app.get("/products-newest", cors(), async (req, res) => {
    const result = await productsCollection.find({}).sort({productDate: -1 }).limit(10).toArray();
    res.send(result);
  });

    //this is API to get category of style
    app.get("/products/by-category/:style",cors(), async(req,res)=>{
      const o_style = new RegExp(req.params.style,"i")
      const result = await productsCollection.find({style:{$regex: o_style}}).toArray();
      res.send(result)
  })

    app.get("/products-get/:style",cors(), async(req,res)=>{
        const o_style = new RegExp(req.params.style,"i")
        const result = await productsCollection.find({style:{$regex: o_style}}).toArray();
        res.send(result)
    })  

  //Tìm kiếm theo tên
  app.get("/products/by-search/:productName",cors(), async(req,res)=>{
    const o_productName = new RegExp(req.params.productName,"i")
    const result = await productsCollection.find({productName:{$regex: o_productName}}).toArray();
    res.send(result)
})

    // app.get("/products-sort-by-price/:price", cors(), async (req,res)=>{
    //     const o_price = new RegExp(req.params.price,"p")
    //     const result = await productsCollection.find({price:{$regex: o_price}}).sort({price: 1}).toArray();
    //     res.send(result)
    // })

    app.get("/products-filter", cors(), async (req,res)=>{
      const min = parseInt(req.query.min);
      const max = parseInt(req.query.max);
      if(isNaN(min) || isNaN(max)){
          res.status(400).send("Invalid min/max price value");
          return;
      }
      const result = await productsCollection.find({price: {$gte: min, $lte: max}}).toArray();
      res.send(result)
  })
  



//------------------------------------ API blogs--------------------------------------
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
// API Home
  // get sp nổi bật từ order
app.get('/api/home', async (req, res) => {
  try {
    const results = await ordersCollection.aggregate([
      { $unwind: '$orderItems' },
      {
        $group: {
          _id: '$orderItems.productId',
          count: { $sum: '$orderItems.quantity' },
          productName: { $first: '$orderItems.productName' },
          price: { $first: '$orderItems.price' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 12 }
    ]).toArray();

    const popularProducts = results.map(result => ({
      productId: result._id,
      count: result.count,
      productName: result.productName,
      price: result.price,
      totalValue: result.count * result.price,
      image: result.image
    }));

    res.status(200).json(popularProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


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


///------------------------------------API Account Page-----------------------------------------
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
    var email = req.params.customerEmail
    const result = await customersCollection.find({customerEmail:email}).toArray();
    res.send(result[0])
})

//-------------------------------API REGISTER , LOGIN------------------------------------------
//login
  app.post("/customers/login",cors(), async(req, res)=>{
    const customerEmail=req.body.customerEmail
    const password=req.body.password
    const crypto = require('crypto');
    const users = await customersCollection.findOne({customerEmail: customerEmail})
    if(users==null)
        res.send(false)
    else
    { 
        hash = crypto.pbkdf2Sync (password, users.salt, 1000, 64, `sha512`).toString(`hex`); 
        if(users.password==hash) 
            res.send(true) 
            
        else
        res.send(false)
    }
}
)

//api thêm 1 customer (đăng ký)
app.post("/customers/register", cors(), async(req, res)=>{
  var crypto = require('crypto'); 
  salt = crypto.randomBytes(16).toString('hex');
  users =req.body
  hash = crypto.pbkdf2Sync(users.password, salt, 1000, 64, `sha512`).toString(`hex`);
  users.password = hash
  users.salt = salt
  await customersCollection.insertOne(users)
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
app.put("/customers/pass/:customerEmail", cors(), async (req,res)=>{
    // console.log(req.body)
    await customersCollection.updateOne(
        {customerEmail: req.params.customerEmail},
        { $set: { 
            customerId: req.body.customerId,
            customerName: req.body.customerName,
            customerEmail: req.body.customerEmail,
            customerPhoneNumb: req.body.customerPhoneNumb,
            customerBirth: req.body.customerBirth,
            customerGender: req.body.customerGender,
            customerAddress: req.body.customerAddress,
            password : req.body.password
        }}
    )
    var email = req.params.customerEmail
    const result = await customersCollection.find({customerEmail:email}).toArray();
    res.send(result[0])
})
//api kiểm tra email, pass khi login
app.post("/users", cors(), async(req, res)=>{
    var crypto = require('crypto'); 
    salt = crypto.randomBytes(16).toString('hex');
    
    usersCollection = database.collection("users")
    users =req.body
    hash = crypto.pbkdf2Sync(users.password, salt, 1000, 64, `sha512`).toString(`hex`);
    users.password = hash
    users.salt = salt
    await usersCollection.insertOne(users)
    res.send(req.body)
})

//-------------------------API TẠO ORDER - THANH TOÁN---------------------------------------
app.post("/orders", cors(), async (req,res) => {
  //lấy orderId của đơn hàng gần nhất
  const lastOrder = await ordersCollection.find().sort({orderId: -1}).limit(1).toArray();
  let nextOrderId = 1;
  if (lastOrder.length > 0) {
    nextOrderId = lastOrder[0].orderId + 1;
  }

  // Lấy ngày hiện tại
  const currentDate = new Date().toLocaleDateString();

  const newOrder = {
    orderId: nextOrderId,
    customerName: req.body.customerName,
    customerEmail: req.body.customerEmail,
    customerPhoneNumb: req.body.customerPhoneNumb,
    customerAddress: req.body.customerAddress,
    orderDate: currentDate,
    totalPrice: req.body.totalPrice,
    orderItems: req.body.orderItems
  }

  //lưu vào database
  await ordersCollection.insertOne(newOrder)
  res.send("Thanh toán thành công!")
})





//---------------------------API ADMIN---------------------------------------------------
// delete khách hàng
  app.delete("/customers/delete/:email", cors(), async (req, res)=>{
    var email= req.params.email;
    const result = await customersCollection.find({customerEmail:email}).toArray();
    await customersCollection.deleteOne(
        {customerEmail: email}
    )
    const result2 = await customersCollection.find({}).toArray();
    res.send(result2)
  }
  )
// login admin
  app.post('/admin', async (req, res) => {
    const { username, password } = req.body;
    const admin = await adminCollection.findOne({ username: username, password: password });
    if (admin) {
      res.send(true); 
    } else {
      res.send(false);
    }});
// lọc orderDate
app.get('/orders/:start/:end', async (req, res) => {
  const result = await ordersCollection.find({
  orderDate: {
    $gte: req.params.start,   // start là chuỗi ngày tháng có định dạng "MM-DD-YYYY"
    $lte: req.params.end      // end là chuỗi ngày tháng có định dạng "MM-DD-YYYY"
  }
}).toArray();
  res.send(result);
});



// Xóa product
 app.delete("/products/delete/:Id", cors(), async (req, res)=>{
    var Id= req.params.Id;
    const result = await productsCollection.find({productId:Id}).toArray();
    await productsCollection.deleteOne(
        {productId: Id}
    )
    const result2 = await productsCollection.find({}).toArray();
    res.send(result2)
  }
  )
  
  // Sửa product
  app.put("/products/update/:Id", cors(), async (req,res)=>{
    // console.log(req.body)
    const { productName, price, image, set, size, style, trait, description } = req.body;
    await productsCollection.updateOne(
      { productId: req.params.Id },
      { $set: { 
        productName: req.body.productName,
        price: req.body.price,
        image: req.body.image, 
        set: req.body.set,
        size: req.body.size,
        style: req.body.style, 
        trait: req.body.trait,
        description: req.body.description } }
    );
    const result = await productsCollection.findOne({ productId: req.params.Id });
    res.send(result);
  });
  // Thêm product
  app.post('/products/add', cors(), async (req, res) => {
    const { productId, productName, description, price, image, set, size, style, trait } = req.body;
    const newProduct = { productId, productName, description, price, image, set, size, style, trait };
    const result = await productsCollection.insertOne(newProduct);
    res.send(result);
  });
  // Kiểm tra Product Id có tồn tại chưa
  app.get("/products/check/:Id", cors(), async (req, res) => {
    const Id = req.params.Id;
    const result = await productsCollection.findOne({ productId: Id });
  
    if (result) {
      res.send(true);
    } else {
      res.send(false);
    }
  });
// app.post("/login",cors(), async(req, res)=>{
//     username=req.body.username
//     password=req.body.password
    
//     var crypto = require('crypto');
//     usersCollection = database.collection("users")
//     users = await usersCollection.findOne({username:username})
//     if(user==null)
//         res.send({"username":username, "message": "not exist"})
//     else
//     { 
//         hash = crypto.pbkdf2Sync (password, users.salt, 1000, 64, `sha512`).toString(`hax`); 
//         if(user.password==hash) 
//             res.send(user) 
//         else
//         res.send({"username":username, "password": password, "message": "wrong password"})
//     }
// }
// )

app.post("/login", cors(), async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    const usersCollection = database.collection("users");
    const user = await usersCollection.findOne({ username: username });
  
    if (!user) {
      res.send({ username: username, message: "not exist" });
      return;
    }
  
    const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, "sha512").toString("hex");
  
    if (hash === user.password) {
      // Lưu thông tin email vào session storage
      req.session.email = user.email;
      res.send(user);
    } else {
      res.send({ username: username, password: password, message: "wrong password" });
    }
  })


