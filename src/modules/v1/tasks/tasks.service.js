import getDatabase from "../../../config/dataBase.js"; 
import taskSchema from "./tasks.validator.js";

const db = getDatabase();

const serviceTask = {
    all:async(userId) => {
        const rows = await db.query("SELECT * FROM tasks WHERE user_Id = ?", [userId]);
        return rows || [];
    },
    create: async(taskData) =>{
        const { error, value } = taskSchema.create.validate(taskData);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const { title, description, userId } = value;

        const result = await db.query(
            "INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)",
            [title, description, userId]
        );
        return {result, userId };
    },
    update: async(updateData) => {
        const { error, value } = taskSchema.update.validate(updateData);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const { title, description, status, taskId, userId } = value;

         const result = await db.query(
            "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?",
            [title, description, status, taskId, userId] 
        );
        if (result.affectedRows === 0) throw new Error("Task not found or does not belong to this user");
        return { result };
    },
    delete: async(taskId, userId) =>{
        const result = await db.query(
        "UPDATE tasks SET is_deleted = TRUE, deleted_at = NOW() WHERE id = ? AND user_id = ?",
        [taskId, userId]
        );
        if (result.affectedRows === 0) throw new Error("Task not found or does not belong to this user");
        return { message: "Task deleted successfully" };
    }
}

export default serviceTask;