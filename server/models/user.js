const pool = require('../db/init_db');
const bcrypt = require('bcryptjs');

class User {

    constructor(data) {
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
        this.newEmail = data.newEmail;
        this.newName = data.newName;
        this.newPassword = data.newPassword;
    }

    static checkForExistingUser(email) {
        return new Promise(async (resolve, reject) => {
            try {
                const checkForEmail = await pool.query('SELECT * FROM users WHERE email = $1;', [email]);

                resolve(checkForEmail.rows);
                
            } catch(err) {
                reject(err.message);
            }
        })
    }

    static checkPassword(loginAttemptPassword, databasePassword) {
        return new Promise(async (resolve, reject) => {
            try {
                const checkPassword = await bcrypt.compare(loginAttemptPassword, databasePassword);

                resolve(checkPassword);
                
            } catch(err) {
                reject(err.message);
            }
        })

    }

    static createNewUser(name, email, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const salt = await bcrypt.genSalt(); // default number is 10 rounds
                const hashedPassword = await bcrypt.hash(password, salt);

                const createUserData = await pool.query('INSERT INTO users (name_of_user, email, user_password) VALUES ($1, $2, $3);', [name, email, hashedPassword]);

                resolve('New User Created.');

            } catch (err) {
                reject(err.message);
            }
        })
    }

    static updateUserName(newName, email) {
        return new Promise(async (resolve, reject) => {
            try {
                const updateName = await pool.query(`UPDATE users SET name_of_user = $1 WHERE email = $2;`, [newName, email]);

                resolve(updateName);

            } catch (err) {
                reject(err.message);
            }
        })
    }

    static updateUserEmail(newEmail, email) {
        return new Promise(async (resolve, reject) => {
            try {
                const updateEmail = await pool.query(`UPDATE users SET email = $1 WHERE email = $2;`, [newEmail, email]);

                resolve(updateEmail);

            } catch (err) {
                reject(err.message);
            }
        })

    }

    static updateUserPassword(newPassword, email) {
        return new Promise(async (resolve, reject) => {
            try {
                const salt = await bcrypt.genSalt(); // default number is 10 rounds
                const hashedPassword = await bcrypt.hash(newPassword, salt);

                const updatePassword = await pool.query(`UPDATE users SET user_password = $1 WHERE email = $2;`, [hashedPassword, email]);

                resolve('Password updated successfully.');

            } catch (err) {
                reject(err.message);
            }
        })
    }

    static deleteUser(email) {
        return new Promise(async (resolve, reject) => {
            try {
                const deleteUser = await pool.query('DELETE FROM users WHERE email = $1;', [email]);
                resolve('User account successfully deleted.', deleteUser);
            } catch (err) {
                reject(err.message);
            }
        })
    }
}

module.exports = User