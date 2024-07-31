import express from "express";
import { connectDB } from "./db/connect.js";
import dotenv from 'dotenv';
import upload from "./middleware/multer.js";
import Product from "./models/Product.js"

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Get all data
app.get('/api/v1/product', async (req, res) => {
  try {
    const products = await Product.find();
    res.json({"products":products})
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get product by ID
app.get('/api/v1/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ msg: "No product found with that ID" });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Create new product
app.post('/api/v1/product', upload.single('file'), async (req, res) => {
    try {
        
      const { title, description } = req.body;
      const file = req.file;
      console.log(req.file)
  
      if (!file) {
        return res.status(400).json({ error: 'Image file is required' });
      }
  
      // Proceed with saving the product details...
      const newProduct = new Product({
        title,
        description,
        image: {
          url: `/uploads/${file.filename}`,
          name: file.originalname,
        },
      });
  
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Failed to create product' });
    }
  });

  //Update The Product
app.patch('/api/v1/product/:id', upload.single('file'), async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const file = req.file;
  
      // Find the product by ID
      const product = await Product.findById(id);
  
      if (!product) {
        return res.status(404).json({ msg: 'No product found with that ID' });
      }
  
      // Update the product details
      if (title) product.title = title;
      if (description) product.description = description;
  
      // Handle file update
      if (file) {
        product.image = {
          url: `/uploads/${file.filename}`,
          name: file.originalname,
        };
      }
  
      // Save the updated product
      await product.save();
      res.json(product);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Failed to update product' });
    }
  });
  
  

// Start server and connect to database
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

start();
