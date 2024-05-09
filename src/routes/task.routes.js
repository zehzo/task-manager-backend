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
  return new TaskController(req, res).update();
});

router.delete("/:id", async (req, res) => {
  return new TaskController(req, res).delete();
});

module.exports = router;
