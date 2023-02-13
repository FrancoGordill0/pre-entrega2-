import  express  from "express";
import { engine } from "express-handlebars";
import mongoose from "mongoose";
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import viewsRoutes from './routes/views.routes.js';

import * as dotenv from "dotenv"
dotenv.config();


const app = express();
const PORT = 8080

const STRING_CONNECTION = `mongodb+srv://ifrank:focus1000@cluster0.cmqpdge.mongodb.net/coderhouse?retryWrites=true&w=majority`;

app.engine('handlebars', engine())
app.set('view engine', 'handlebars');
app.set('views','./src/views');
app.use(express.static('public'))


const server = app.listen(PORT, () => { console.log(`Server listening on ${PORT}`)})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productRoutes)
app.use('/api/carts', cartRoutes)
app.use('/api/viewProducts', viewsRoutes)


mongoose.set('strictQuery', false);

const environment = async () => {
    await mongoose
      .connect(STRING_CONNECTION)
      .then(() => console.log("Conectado a la base de datos"))
      .catch((error) => console.log("Error de conexion", error));
  };
  
  environment();