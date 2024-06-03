import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({ 
    taskName: {
        type: String,
        required: [true, "taskName Required"]
    },
    taskDescreption: {
        type: String,
        required: [true, "taskDescreption Required"]
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const Task = mongoose.model("task", taskSchema);

export default Task;