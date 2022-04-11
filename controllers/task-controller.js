const User = require("../models/user");
const createPath = require('../helpers/create-path');

const handleError = (res, error) => {
    console.log(error);
    res.render(createPath('error'), { title: 'Error' })
};

const getTask = async (req, res) => {
    const title = 'Задачи';
    const { id } = req.user;
    var currentUser = await User.findById(id);
    var tasks = currentUser.tasks;
    res.render(createPath('taskManager'), { tasks, title });
}

const createTask = (req, res) => {
    res.render(createPath('createTask'));
}

const deleteTask = async (req, res) => {
    const { id } = req.user;
    const currentUser = await User.findById(id);
    var tasks = currentUser.tasks;
    var taskId = req.params.id;
    const index = tasks.findIndex((task) => task.id === taskId);
    tasks.splice(index, 1);
    await currentUser.save();
    res.redirect("/task-manager");
}

const updateTask = async (req, res) => {
    const { id } = req.user;
    var currentUser = await User.findById(id);
    var tasks = currentUser.tasks;
    var taskId = req.params.id;
    tasks.map((task) => {
      if (task.id === taskId) {
        task.completed = "Проведено";
      }
    });
    await currentUser.save();
    res.render(createPath('taskManager'), { tasks });
}

const postTask = async (req, res) => {
    const { task, group, countStudents, startDate, endDate } = req.body;
    const { id } = req.user;
    const currentUser = await User.findById(id);
    currentUser.tasks.push({
      task: task,
      group: group,
      countStudents: countStudents,
      startDate:startDate,
      endDate: endDate,
      completed: "В процессе",
    });
    await currentUser.save();
    res.redirect("/task-manager");
}
/* app.get("/task-manager", requireAuth, async (req, res) => {
    const { id } = req.user;
    var currentUser = await User.findById(id);
    var tasks = currentUser.tasks;
    res.render("./partials/taskManager", { tasks });
  }); */

 /*  app.get("/create-task", requireAuth, (req, res) => {
    res.render("./partials/createTask");
  }); */

/*   app.get("/task-manager/delete/:id", requireAuth, async (req, res) => {
    const { id } = req.user;
    const currentUser = await User.findById(id);
    var tasks = currentUser.tasks;
    var taskId = req.params.id;
    const index = tasks.findIndex((task) => task.id === taskId);
    tasks.splice(index, 1);
    await currentUser.save();
    res.redirect("/task-manager");
  }); */

 /*  app.get("/task-manager/update/:id", requireAuth, async (req, res) => {
    const { id } = req.user;
    var currentUser = await User.findById(id);
    var tasks = currentUser.tasks;
    var taskId = req.params.id;
    tasks.map((task) => {
      if (task.id === taskId) {
        task.completed = "Completed";
      }
    });
    await currentUser.save();
    res.render("./partials/taskManager", { tasks });
  }); */

/*   app.post("/create-task", requireAuth, async (req, res) => {
    const { task, endDate } = req.body;
    const { id } = req.user;
    const currentUser = await User.findById(id);
    currentUser.tasks.push({
      task: task,
      endDate: endDate,
      completed: "In-Complete",
    });
    await currentUser.save();
    res.redirect("/task-manager");
  }); */

  module.exports = {
    getTask,
    createTask,
    deleteTask,
    updateTask,
    postTask
}