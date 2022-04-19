const User = require("../models/user");
const createPath = require('../helpers/create-path');
var mongoXlsx = require('mongo-xlsx');
var XLSX = require('xlsx');

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

/* const excel = async (req, res) => {
    const {id} = req.user;
    var currentUser = await User.findById(id);
    var tasks = currentUser.tasks;
    console.log(tasks);
    var model = mongoXlsx.buildDynamicModel(tasks);
    console.log(model);
    var options =  {
      save: true,
      sheetName: [],
      fileName: "Schedule Report-" + new Date().getTime() + ".xlsx",
      defaultSheetName: "Schedule Report"
    }
    mongoXlsx.mongoData2Xlsx(tasks, model, options, function(err, tasks) {
      console.log('File saved at:', tasks.fullPath); 
      res.download(tasks.fullPath);
    });
} */

const excel = async (req, res) => {
  const {id} = req.user;
  var currentUser = await User.findById(id);
  var tasks = currentUser.tasks;
  var wb = XLSX.utils.book_new();
  var temp = JSON.stringify(tasks);
  temp = JSON.parse(temp);
  var ws = XLSX.utils.json_to_sheet(temp);
  var down = 'exportXLSX/exportdata.xlsx';
  XLSX.utils.book_append_sheet(wb, ws, "sheet1");
  XLSX.writeFile(wb, down);
  res.download(down);
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

const updateTask2 = async (req, res) => {
  const { id } = req.user;
  var currentUser = await User.findById(id);
  var tasks = currentUser.tasks;
  var taskId = req.params.id;
  tasks.map((task) => {
    if (task.id === taskId) {
      task.completed = "Не завершено";
    }
  });
  await currentUser.save();
  res.render(createPath('taskManager'), { tasks });
}

const postTask = async (req, res) => {
    const { task, group, countStudents, startDate, endDate, typeWork, course, numberWeek, dayWeek } = req.body;
    const { id } = req.user;
    const currentUser = await User.findById(id);
    currentUser.tasks.push({
      task: task,
      group: group,
      countStudents: countStudents,
      startDate:startDate,
      endDate: endDate,
      dayWeek: dayWeek,
      typeWork: typeWork,
      course: course,
      numberWeek: numberWeek,
      completed: "Запланировано",
    });
    await currentUser.save();
    res.redirect("/task-manager");
}

  module.exports = {
    getTask,
    createTask,
    deleteTask,
    updateTask,
    updateTask2,
    postTask,
    excel
}