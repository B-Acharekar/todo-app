const express = require('express');
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todo.controller');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.use(auth);

router.get('/', getTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
