const express = require("express");
const TaskModel = require("../models/tasks.model");
const TaskController = require("../controllers/task.controller");

const router = express.Router();

router.get("/", async (req, res) => {
  return new TaskController(req, res).get();
});

router.get("/:id", async (req, res) => {
  return new TaskController(req, res).getById();
});

router.post("/", async (req, res) => {
  return new TaskController(req, res).create();
});

router.patch("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskData = req.body;

    const taskToUpdate = await TaskModel.findById(taskId);

    const allowedUpdates = ["isCompleted"];
    const requestedUpdates = Object.keys(taskData);

    for (update of requestedUpdates) {
      if (allowedUpdates.includes(update)) {
        taskToUpdate[update] = taskData[update];
      }
      return res.status(500).send("Um ou mais campos não editáveis");
    }

    await taskToUpdate.save();

    return res.status(200).send(taskToUpdate);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskToDelete = await TaskModel.findById(taskId);
    if (!taskToDelete) {
      return res.status(404).send("Tarefa não encontrada");
    }
    const deletedTask = await TaskModel.findByIdAndDelete(taskId);
    res.status(200).send(deletedTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
