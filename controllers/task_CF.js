const Task = require('../models/task_MDLs');
const asyncWraper = require('../middleware/asyncwrapper');
const { CreateCustomError } = require('../errors/custom-error');

const getAll = asyncWraper(async (req, res) => {
  const task = await Task.find({});
  res.status(200).json({ tasks: task }); //obj.notation
});

const createAll = asyncWraper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task }); //destruncturing
});

//there are 2 types of error in ids 1.generic -404-if the syntax match but the character didnt
//  2.CastError - if the syntax is not matched and is totaly differnt
const getOne = asyncWraper(async (req, res, next) => {
  console.log('>>>>>>>>>>>>', req);
  const { id: taskID } = req.params; //******it here we destructute at the same time assigning it to taskID
  const task = await Task.findOne({ _id: taskID });
  //return in if gives wether like that condition only existed it invokes or not
  if (!task) {
    return next(CreateCustomError(`no task id like this ${taskID} exist`, 404));
  }
  res.status(200).json({ task });
});
const updateOne = asyncWraper(async (req, res) => {
  const { id: taskID } = req.params;
  //3rd one is the option
  //here we should do the validator error  and also new so the updated value will show as new
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, { new: true, runValidators: true });
  if (!task) {
    return next(CreateCustomError(`no task id like this ${taskID} exist`, 404));
  }
  res.status(200).json({ task });
});
const createOne = (req, res) => res.send('create one');

const deleteOne = asyncWraper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(CreateCustomError(`no task id like this ${taskID} exist`, 404));
  }
  res.status(200).json({ task });
});
const deleteAll = asyncWraper(async (req, res) => {
  const task = await Task.deleteMany({});
  res.status(200).json({ tasks: task }); //obj.notation
});
module.exports = { getAll, createAll, getOne, updateOne, createOne, deleteOne, deleteAll };

//patch vs put - in patch if we only pass the name and not the other property then only that property is updated
//so in patch the data is updated partially
//in put the property is updated fully and overwritten, so give the option as overreturn:true and so if i didnt give the property it willbe removed
