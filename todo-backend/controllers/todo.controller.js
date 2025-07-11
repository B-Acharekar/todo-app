const Todo = require('../models/todo.model');

exports.getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.userId });
  res.json(todos);
};

exports.createTodo = async (req, res) => {
  const todo = await Todo.create({ text: req.body.text, user: req.userId });
  res.status(201).json(todo);
};

exports.updateTodo = async (req, res) => {
  const updated = await Todo.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    { text: req.body.text },
    { new: true }
  );
  res.json(updated);
};

exports.deleteTodo = async (req, res) => {
  await Todo.findOneAndDelete({ _id: req.params.id, user: req.userId });
  res.json({ message: 'Deleted' });
};
