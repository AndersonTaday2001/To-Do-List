import serviceTask from "./tasks.service.js";

const taskController = {
  getAllTasks: async (req, res) => {
    try {
      const userId = req.user.userId;
      const tasks = await serviceTask.all(userId);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  createTasks: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { title, description } = req.body;
      const task = await serviceTask.create({ title, description, userId });
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateTasks:async  (req, res) => {
    try {
      const userId = req.user.userId;
      const { taskId } = req.params;
      const { title, description, status } = req.body;

      const result = await serviceTask.update({
        title,
        description,
        status,
        taskId,
        userId
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteTasks: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { taskId } = req.params;

      const result = await serviceTask.delete(taskId, userId);
      res.status(200).json(result);
    } catch (error) {
       res.status(400).json({ message: error.message });
    }
  },
};

export default taskController;
