import getDatabase from "../../../config/dataBase.js"; 
import taskSchema from "./tasks.validator.js";

const db = getDatabase();

const serviceTask = {
    all:async(userId) => {
        const rows = await db.query("SELECT id, title, description, status, created_at FROM tasks WHERE user_id = ? AND is_deleted = FALSE ORDER BY created_at DESC", [userId]);
        return rows || [];
    },
    create: async({ title, description, userId }) =>{
        const { error, value } = taskSchema.create.validate({ title, description});
        if (error) {
            throw new Error(error.details[0].message);
        }
        const { title: validTitle, description: validDescription } = value;

        const result = await db.query(
            "INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)",
            [validTitle, validDescription, userId]
        );
        return { 
            
            title: validTitle, 
            description: validDescription,
            message: "Tarea creada exitosamente" 
        };;
    },
    update: async({title, description, status, taskId, userId }) => {
        const { error, value } = taskSchema.update.validate({title, description, status});
        if (error) {
            throw new Error(error.details[0].message);
        }
        const { title: validTitle, description:validDescription, status:validStatus } = value;

         const result = await db.query(
            "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?",
            [validTitle, validDescription, validStatus, taskId, userId] 
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