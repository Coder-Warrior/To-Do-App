import express from "express";
import Task from '../models/taskModel.js';

const router = express.Router();

router.get("/", async (req, res) => {
    const tasks = await Task.find({});
    res.render("index", { tasks });
});

export default router;