import getDatabase from "../../../config/dataBase.js"; 

const db = getDatabase();

const serviceTask = {
    all:async(userId) => {
        const rows = await db.query("SELECT * FROM tasks WHERE user_Id = ?", [userId]);
        return rows || [];
    },
    create: async({title, description, userId}) =>{
        const result = await db.query(
            "INSERT INTO tasks (title, description, user_Id) VALUES (?, ?, ?)",
            [title, description, userId]
        );
        return {result, userId };
    },
    update: async({title, description, status, taskId ,user_id}) => {
         const result = await db.query(
            "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? AND user_Id = ?",
            [title, description, status, taskId, userId] 
        );
        if (result.affectedRows === 0) throw new Error("Task not found or does not belong to this user");
        return { result };
    },
    delete: async(taskId, userId) =>{
        const result = await db.query(
            "DELETE FROM tasks WHERE id = ? AND user_Id = ?",
            [taskId, userId]
        );
        if (result.affectedRows === 0) throw new Error("Task not found or does not belong to this user");
        return { message: "Task deleted successfully" };
    }
}

export default serviceTask;