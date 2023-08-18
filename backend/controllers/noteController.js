import noteSchema from "../models/noteSchema.js";

//post(create)
export const createNote = async (req, res) => {
  try {
    // console.log(req.body);
    const { title, content } = req.body;
    const createNote = await noteSchema.create({
      title,
      content,
    });
    // console.log(createNote);
    if (createNote) {
      res.json({
        status: 200,
        succuss: true,
        message: "Note created Succesfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: 404,
      succuss: false,
      message: "Failed to Create Note..",
    });
  }
};

//get(read)
export const getAll = async (req, res) => {
  try {
    const note = await noteSchema.find({});
    if (note) {
      res.json({
        status: 200,
        succuss: true,
        message: "Note Fetched Succesfully",
        note,
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      status: 404,
      succuss: false,
      message: "Failed to Fetch Note..",
    });
  }
};

//getById
export const getById = async (req, res) => {
  try {
    const note = await noteSchema.findById(req.params.id);
    if (note) {
      res.json({
        status: 200,
        success: true,
        message: "Note Fetched Succesfully",
        note,
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      status: 404,
      success: false,
      message: " Failed to Fetch note",
    });
  }
};

//put(update)
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const note = await noteSchema.findById(id);
    if (note) {
      note.title = title;
      note.content = content;
      await note.save();
      res.json({
        status: 200,
        success: true,
        message: "Note Updated Successfully",
        note,
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      status: 404,
      success: false,
      message: "Failed to Update Note",
    });
  }
};

//delete(delete)
export const deleteNote = async (req, res) => {
  try {
    const note = await noteSchema.findByIdAndDelete(req.params.id);
    if (note) {
      res.json({
        status: 200,
        success: true,
        message: "Note Deleted Successfully",
        note,
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      status: 404,
      success: false,
      message: "Failed to Delete Note",
    });
  }
};
