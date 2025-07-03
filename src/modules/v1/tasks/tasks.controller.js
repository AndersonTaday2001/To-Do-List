const taskController = {
  getAllTasks: (req, res) => {
    res.send("get all tasks");
  },

  createTasks: (req, res) => {
    res.send("create tasks");
  },

  updateTasks: (req, res) => {
    res.send("update Tasks");
  },

  deleteTasks: (req, res) => {
    res.send("Delete Tasks");
  },
};

export default taskController;
