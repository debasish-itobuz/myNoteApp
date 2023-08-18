import mongoose from "mongoose";
import express from "express";
import routes from "./routes/noteRoute.js";
import cors from 'cors';

const PORT = 7800;
const app = express();

app.use(cors());
app.options('*', cors());

app.use(express.json());

app.use("/note", routes); //setting global endpoint

app.listen(PORT, () => {
  console.log(`server connected at port : ${PORT}`);
});

// const url = 'mongodb://localhost/noteDb'
const url = "mongodb+srv://debasish:1234@cluster0.5nqou5d.mongodb.net/"

async function dbConnect() {
  await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected to Mongodb");
    })
    .catch((err) => {
      console.log(err);
    });
}

dbConnect();
