const TaskModel = require("../models/tasks.model");

class TaskController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  async get() {
    try {
      const tasks = await TaskModel.find({});
      this.res.status(200).send(tasks);
    } catch (error) {
      this.res.status(500).send(error.message);
    }
  }

  async getById() {
    try {
      const taskId = this.req.params.id;
      const task = await TaskModel.findById(taskId);

      if (!task) {
        return this.res.status(404).send("Esta tarefa não foi encontrada!");
      }
      this.res.status(200).send(task);
    } catch (error) {
      this.res.status(500).send(error.message);
    }
  }

  async create() {
    try {
      const newTask = new TaskModel(this.req.body);
      await newTask.save();
      this.res.status(200).send(newTask);
    } catch (error) {
      this.res.status(500).send(error.message);
    }
  }
}

module.exports = TaskController;
