import express from "express";
import {
  createNote,
  deleteNote,
  getAll,
  getById,
  updateNote,
} from "../controllers/noteController.js";

const route = express.Router();

route.post("/create", createNote); // combining function with url = API
route.get("/get", getAll);
route.get("/get/:id", getById);
route.put("/update/:id", updateNote);
route.delete("/delete/:id", deleteNote);

export default route;
