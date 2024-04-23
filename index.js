const express = require('express')
const dotenv = require('dotenv')
const connectToDatabase = require('./src/database/mongoose.database')
const TaskModel = require('./src/models/tasks.model')

dotenv.config()
const app = express()
app.use(express.json())

connectToDatabase();
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await TaskModel.find({})
    res.status(200).send(tasks)
  } catch (error){
    res.status(500).send(error.message)
  }
})

app.get('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id
    const task = await TaskModel.findById(taskId)
    
    if (!task){
      return res.status(404).send('Esta tarefa não foi encontrada!')
    }
    res.status(200).send(task)

  } catch (error) {
    res.status(500).send(error.message)  
  }
})

app.post('/tasks', async (req, res) => {
  try {
    const newTask = new TaskModel(req.body)
    await newTask.save()
    res.status(200).send(newTask)
  } catch (error) {
    res.status(500).send(error.message)  
  }
})

app.delete('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id
    const taskToDelete = await TaskModel.findById(taskId)
    if (!taskToDelete){
      return res.status(404).send('Tarefa não encontrada')
    }
    const deletedTask = await TaskModel.findByIdAndDelete(taskId)
    res.status(200).send(deletedTask)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

const port = 8000
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})