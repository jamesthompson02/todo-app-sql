const pool = require('../db/init_db');

class Todo {

    constructor(data) {
        this.id = data.id;
        this.email = data.email;
        this.todoId = data.todoId;
        this.todoTitle = data.todoTitle;
        this.todoDescription = data.todoDescription;
        this.todoCreationDate = data.todoCreationDate;
        this.todoDeadlineDate = data.todoDeadlineDate;
        this.todoDeadlineTime = data.todoDeadlineTime;
    }

    static getTodosForUser(email) {
        return new Promise (async (resolve, reject) => {
            try {
                const todos = await pool.query('SELECT * FROM todos WHERE user_id = $1', [email]);

                resolve(todos.rows);

            } catch(err) {
                reject(err.message);
            }
        })
    }

    static createTodo(email, todoTitle, todoDescription = '', todoDeadlineDate = '', todoDeadlineTime = '') {
        return new Promise (async (resolve, reject) => {
            try {
                const createTodo = await pool.query('INSERT INTO todos (todo_title, todo_description, todo_creation_date, todo_deadline_date, todo_deadline_time, user_id) VALUES ($1, $2, $3, $4, $5, $6);', [todoTitle, todoDescription, new Date().toISOString(), todoDeadlineDate, todoDeadlineTime, email]);
                
                resolve('Todo created.');

            } catch(err) {
                reject(err.message);
            }
        })   
    }

    static updateTodo(id, todoTitle, todoDescription, todoDeadlineDate, todoDeadlineTime) {
        return new Promise (async (resolve, reject) => {
            try {
                const updateTodo = await pool.query('Update todos SET todo_title = $1, todo_description = $2, todo_deadline_date = $3, todo_deadline_time = $4 WHERE todo_id = $5;', [todoTitle, todoDescription, todoDeadlineDate, todoDeadlineTime, id]);
                
                resolve('Todo updated.');

            } catch(err) {
                reject(err.message);
            }
        }) 

    }

    static deleteTodo(id) {
        return new Promise (async (resolve, reject) => {
            try {           
                const deleteTodo = await pool.query('DELETE FROM todos WHERE todo_id = $1;', [id]);
                
                resolve('Todo deleted.');

            } catch(err) {
                reject(err.message);
            }
        })

    }

}

module.exports = Todo;