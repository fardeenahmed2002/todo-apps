import express from 'express';
import { deleteTodo, getAllTodos, postTodo, updateTodo } from '../controllers/todoController.js';
import userAuth from '../middleware/userAuth.js';
export const todoRouter = express.Router();

todoRouter.post(`/todos`, userAuth, postTodo);
todoRouter.get(`/todos`, userAuth, getAllTodos);
todoRouter.put(`/todos/:id`, userAuth, updateTodo);
todoRouter.delete(`/todos/:id`, userAuth, deleteTodo);