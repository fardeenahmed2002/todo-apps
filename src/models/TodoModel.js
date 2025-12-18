import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true},
    title: {                
        type: String,
        required: true,
        trim: true
    },
    description: {          
        type: String,
        default: ''
    },
    completed: {           
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const TodoModel = mongoose.models.Todos || mongoose.model('Todos', todoSchema);
export default TodoModel;
