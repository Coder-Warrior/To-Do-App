import express from "express";
import Task from '../models/taskModel.js';

const router = express.Router();

const handleErrors = (err) => {
    let errors = { taskName: '', taskDescreption: '' };
  
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
  
    return errors;
  }

router.get("/addTask", (req, res) => {
    res.render("addTask");
});

router.post("/addTask", async (req, res) => {
    const { taskName, taskDescreption } = req.body;
    try {
        await Task.create({ taskName, taskDescreption });
        res.status(200).json({ added: true });
    } catch (err) {
        res.status(400).json({ errors: handleErrors(err) });
    }
});

router.post("/completeTask", async (req, res) => {
    try {
        await Task.updateOne({ _id: req.body.id }, { $set: { completed: true } });
        res.status(200);
    } catch (e) {
        console.log(e);
    }
});

router.post("/unCompleteTask", async (req, res) => {
    try {
        await Task.updateOne({ _id: req.body.id }, { $set: { completed: false } });
        res.status(200);
    } catch (e) {
        console.log(e);
    }
});

// get Information Page for specific Task

router.get("/taskInfo/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findOne({ _id: id });
        res.render("taskInfo", { task });
    } catch (e) {
        console.log(e);
    }
});

// get UpdatePage for specific Task

router.get("/edit/:id", async (req, res) => {
    const { id } = req.params;
    res.render("edit", { id });
});

// Update Task

router.put("/editTask", async (req, res) => {
   const { taskName, taskDescreption, id } = req.body;
   let error = "";
   try {
    if (taskName.length < 1 && taskDescreption.length < 1) {
        error = "changes required";
    }

    if (error.length > 1) {
        return res.status(400).json({ error });
    }

    if (taskName.length > 1 && taskDescreption.length < 1) {
        await Task.updateOne({ _id: id }, { $set: { taskName } });
    } else if (taskName.length < 1 && taskDescreption.length > 1) {
        await Task.updateOne({ _id: id }, { $set: { taskDescreption } });
    } else {
        await Task.updateOne({ _id: id }, { $set: { taskName, taskDescreption } });
    }


    res.status(200).json({ changed: true });

   } catch (e) {
     console.log(e);
   }
});

// delete Task

router.delete("/deleteTask/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await Task.deleteOne({ _id: id });
        res.status(200);
    } catch (e) {
        console.log(e);
    }

});

export default router;