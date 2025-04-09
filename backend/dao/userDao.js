const db = require("../database/db");
const bcrypt = require("bcryptjs");

class UserDAO {
    static async createUser(username, password) {
        return new Promise(async (resolve, reject) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            const apiKey = Math.random().toString(36).substr(2, 16);

            db.run(
                `INSERT INTO users (username, password, api_key) VALUES (?, ?, ?)`,
                [username, hashedPassword, apiKey],
                function (err) {
                    if (err) reject(err);
                    else resolve({ id: this.lastID, apiKey });
                }
            );
        });
    }

    static async findUserByUsername(username) {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
                if (err) reject(err);
                else resolve(user);
            });
        });
    }

    static async validateUser(username, password) {
        return new Promise(async (resolve, reject) => {
            const user = await this.findUserByUsername(username);
            if (!user) return resolve(null);

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) return resolve(null);

            resolve(user);
        });
    }

    static async getUserByApiKey(apiKey) {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM users WHERE api_key = ?", [apiKey], (err, user) => {
                if (err) reject(err);
                else resolve(user);
            });
        });
    }
}

module.exports = UserDAO;
