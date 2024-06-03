import express from "express";
import mongoose from "mongoose";
import mainRoutes from './routes/main.js';
import taskRoutes from './routes/taskRoute.js';

import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

app.set("view engine", "ejs");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(mainRoutes);
app.use(taskRoutes);

mongoose
  .connect(
    ""
  )
  .then(_ =>
    app.listen(3000, _ => console.log("server listening on port -> 3000"))
  )
  .catch((err) => console.log(err));
