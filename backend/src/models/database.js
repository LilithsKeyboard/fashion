// db.js - Singleton pattern implementation for PostgreSQL
const { Client } = require('pg');

class Database {
    constructor() {
        if (!Database.instance) {
            this.client = new Client({
                host: "localhost",
                user: "postgres",
                password: "1234",
                database: "Fashion",
                port: 5432,
            });

            this.client.connect((err) => {
                if (err) {
                    console.error('Connection error:', err.stack);
                } else {
                    console.log('Connected to the database');
                }
            });

            Database.instance = this;
        }

        return Database.instance;
    }

    async query(sql, params) {
        try {
            const res = await this.client.query(sql, params);
            return res.rows;
        } catch (err) {
            console.error('Query error:', err.stack);
            throw err;
        }
    }

    disconnect() {
        this.client.end((err) => {
            if (err) {
                console.error('Disconnection error:', err.stack);
            } else {
                console.log('Disconnected from the database');
            }
        });
    }
}

const instance = new Database();
Object.freeze(instance); // Prevent modifications to the instance
module.exports = instance;
