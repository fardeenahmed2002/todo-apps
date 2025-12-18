import TodoModel from "../models/TodoModel.js";

export const postTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        // getting userid form token
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: `User is not logged in or signed up`
            })
        }
        const newTodo = new TodoModel({
            title,
            description,
            userId
        });

        await newTodo.save();

        return res.status(201).json({
            success: true,
            message: "Todo created successfully",
            todo: newTodo
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



export const getAllTodos = async (req, res) => {
    try {
        const userId = req.userId
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: `User is not logged in or signed up`
            })
        }

        const todos = await TodoModel.find({ userId })
        if (todos.length === 0) {
            return res.status(404).json({
                success: false,
                message: `no todos found`
            })
        }
        return res.status(200).json({
            success: true,
            message: `todos found`,
            todos
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


export const updateTodo = async (req, res) => {

    try {
        const userId = req.userId
        const todoId = req.params.id
        const { title, description, completed } = req.body

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: `User is not logged in or signed up`
            })
        }

        const todo = await TodoModel.findById(todoId)

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found'
            })
        }


        if (todo.userId.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: 'You are not allowed to update this todo'
            })
        }


        todo.title = title ?? todo.title
        todo.description = description ?? todo.description
        todo.completed = completed ?? todo.completed

        await todo.save()

        return res.status(200).json({
            success: true,
            message: 'Todo updated successfully',
            todo
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const userId = req.userId
        const todoId = req.params.id

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: `User is not logged in or signed up`
            })
        }

        const todo = await TodoModel.findById(todoId)

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found'
            })
        }


        if (todo.userId.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: 'You are not allowed to delete this todo'
            })
        }

        await todo.deleteOne()

        return res.status(200).json({
            success: true,
            message: 'Todo deleted successfully'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}