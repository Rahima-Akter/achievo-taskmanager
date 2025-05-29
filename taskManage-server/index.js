require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 9000;
const app = express();

// middleware
const corsOptions = {
  origin: ["http://localhost:5173", "https://achievo-task-manager.netlify.app"],
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  optionSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// token
const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).send({ message: "unauthorized access" });
  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) return res.status(401).send({ message: "unauthorized access" });
    req.user = decoded;
    next();
  });
};

// Mongoose Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  photo: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const taskSchema = new mongoose.Schema({
  email: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: String },
  category: { type: String, default: "todo" },
  createdAt: { type: Date, default: Date.now },
});

const goalSchema = new mongoose.Schema({
  email: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  target: { type: Number, required: true },
  completed: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// Mongoose Models
const User = mongoose.model("User", userSchema);
const Task = mongoose.model("Task", taskSchema);
const Goal = mongoose.model("Goal", goalSchema);

// MongoDB connection with Mongoose
mongoose
  .connect(process.env.MONGO_URI_LINK)
  .then(() => console.log("Connected to MongoDB with Mongoose"))
  .catch((err) => console.faild("MongoDB connection faild:", err));

// create jwt token
app.post("/jwt", async (req, res) => {
  const email = req.body;
  const token = jwt.sign(email, process.env.SECRET_TOKEN, {
    expiresIn: "2h",
  });
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    })
    .send({ success: true });
});

// clear cookie on sign-out
app.get("/sign-out", async (req, res) => {
  res
    .clearCookie("token", {
      maxAge: 0,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    })
    .send({ success: true });
});

// ** task related apis start **************************************

// ** post task
app.post("/tasks", verifyToken, async (req, res) => {
  try {
    const task = new Task(req.body);
    const result = await task.save();
    res.send(result);
  } catch (faild) {
    res.status(500).send({ message: "Failed to create task" });
  }
});

// ** get task by email
app.get("/tasks/:email", verifyToken, async (req, res) => {
  try {
    const email = req.params.email;
    const tasks = await Task.find({ email });
    res.send(tasks);
  } catch (faild) {
    res.status(500).send({ message: "faild to fetch tasks" });
  }
});

// ** delete a single task
app.delete("/delete-single-task/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Task.findByIdAndDelete(id);
    if (!result) return res.status(404).send({ message: "Task not found" });
    res.status(200).send(result);
  } catch (faild) {
    res.status(500).send({ message: "faild to delete task" });
  }
});

// ** get task by id
app.get("/task-by-id/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);
    if (!task) return res.status(404).send({ message: "Task not found" });
    res.status(200).send(task);
  } catch (faild) {
    res.status(500).send({ message: "faild fetching task" });
  }
});

// ** update task by id
app.patch("/task-by-id/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
      },
      { new: true }
    );
    if (!updatedTask)
      return res.status(404).send({ message: "Task not found" });
    res.send(updatedTask);
  } catch (faild) {
    res.status(500).send({ message: "faild updating task" });
  }
});

// ** change category to in-progress
app.patch("/in-progress/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { category: "in-progress" },
      { new: true }
    );
    if (!updatedTask)
      return res.status(404).send({ message: "Task not found" });
    res.send(updatedTask);
  } catch (faild) {
    res.status(500).send({ message: "faild updating task" });
  }
});

// ** change category to done
app.patch("/done/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { category: "done" },
      { new: true }
    );
    if (!updatedTask)
      return res.status(404).send({ message: "Task not found" });
    res.send(updatedTask);
  } catch (faild) {
    res.status(500).send({ message: "faild updating task" });
  }
});

app.patch("/update-categories/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { category } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { category },
      { new: true }
    );
    if (!updatedTask)
      return res.status(404).send({ message: "Task not found" });
    res.status(200).send(updatedTask);
  } catch (faild) {
    res.status(500).send({ message: "faild updating task category" });
  }
});

// ** task related apis end **********************************************

app.post("/users/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const isExist = await User.findOne({ email });
    if (isExist)
      return res.status(400).send({ message: "user already exists" });

    const user = new User({
      ...req.body,
      createdAt: new Date(),
    });
    const result = await user.save();
    res.status(200).send(result);
  } catch (faild) {
    res.status(500).send({ message: "faild creating user" });
  }
});

app.get("/user/:email", verifyToken, async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.find({ email });
    res.status(200).send(user);
  } catch (faild) {
    res.status(500).send({ message: "faild fetching user" });
  }
});

// ** goal related apis ***************************************************
// Create goal
app.post("/goal/:email", verifyToken, async (req, res) => {
  try {
    const { title, category, target } = req.body;
    if (!title || !target) {
      return res.status(400).json({ message: "Title and target are required" });
    }

    const goal = new Goal({
      email: req.params.email,
      title,
      category,
      target: Number(target),
      completed: 0,
    });

    const savedGoal = await goal.save();
    res.status(201).json(savedGoal);
  } catch (faild) {
    console.faild("Goal creation faild:", faild);
    res.status(500).json({ message: "Failed to create goal" });
  }
});

// Update completion number
app.patch("/completed/:id", verifyToken, async (req, res) => {
  try {
    const { completed } = req.body;
    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      { completed },
      { new: true }
    );

    if (!updatedGoal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    res.json(updatedGoal);
  } catch (faild) {
    console.faild("Update faild:", faild);
  }
});

// Get goals
app.get("/get-goal/:email", verifyToken, async (req, res) => {
  try {
    const goals = await Goal.find({ email: req.params.email });
    res.send(goals);
  } catch (faild) {
    console.faild("Fetch faild:", faild);
    res.status(500).json({ message: "Failed to fetch goals" });
  }
});

// Delete goal
app.delete("/delete-goal/:id", verifyToken, async (req, res) => {
  try {
    const deletedGoal = await Goal.findByIdAndDelete(req.params.id);

    if (!deletedGoal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    res.json({ message: "Goal deleted successfully" });
  } catch (faild) {
    console.faild("Delete faild:", faild);
    res.status(500).json({ message: "Failed to delete goal" });
  }
});

// ** goal related apis end ***************************************************

// zenqoutes
app.get("/quotes", async (req, res) => {
  try {
    const response = await fetch("https://zenquotes.io/api/quotes");
    const data = await response.json();
    res.status(200).send(data);
  } catch (faild) {
    res.status(500).send({ message: "faild fetching quotes" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello from Achievo Server..");
});

app.listen(port, () => {
  console.log(`Achievo is running on port ${port}`);
});
