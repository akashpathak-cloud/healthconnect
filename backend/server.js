const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");

const pool = require("./db");
const authRoutes = require("./routes/auth");
const studiesRoutes = require("./routes/studies");


const app = express();

const PORT = process.env.PORT || 3000;

const SESSION_SECRET =
    process.env.SESSION_SECRET ||
    "healthconnect-local-secret";


/*
 * BASIC MIDDLEWARE
 */

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


/*
 * SESSION
 */

app.use(
    session({

        secret: SESSION_SECRET,

        resave: false,

        saveUninitialized: false,

        cookie: {

            httpOnly: true,

            secure: false,

            sameSite: "lax",

            maxAge: 8 * 60 * 60 * 1000
        }
    })
);


/*
 * HEALTH CHECK
 */

app.get("/api/health", (req, res) => {

    res.json({
        success: true,
        message: "HealthConnect API is running"
    });
});


/*
 * AUTH ROUTES
 */

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/studies",
    studiesRoutes
);


/*
 * PROTECTED TEST ENDPOINT
 */

app.get("/api/protected", (req, res) => {

    if (!req.session.user) {

        return res.status(401).json({

            success: false,

            message: "Authentication required"
        });
    }


    res.json({

        success: true,

        message: "You are authenticated",

        user: req.session.user
    });
});


/*
 * INITIALIZE DATABASE
 *
 * Creates the users table if it doesn't exist.
 *
 * Also creates our development test user:
 *
 * username: admin
 * password: admin123
 */

async function initializeDatabase() {

    console.log("Initializing database...");


    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (

            id SERIAL PRIMARY KEY,

            username VARCHAR(100) UNIQUE NOT NULL,

            password_hash TEXT NOT NULL,

            role VARCHAR(50) NOT NULL DEFAULT 'radiologist',

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);


    const existingUser = await pool.query(
        `
        SELECT id
        FROM users
        WHERE username = $1
        `,
        ["admin"]
    );


    if (existingUser.rows.length === 0) {

        const passwordHash =
            await bcrypt.hash("admin123", 10);


        await pool.query(
            `
            INSERT INTO users
            (
                username,
                password_hash,
                role
            )
            VALUES
            ($1, $2, $3)
            `,
            [
                "admin",
                passwordHash,
                "radiologist"
            ]
        );


        console.log(
            "Created default user: admin"
        );

    } else {

        console.log(
            "Default user already exists"
        );
    }
}


/*
 * START SERVER
 */

async function startServer() {

    try {

        await initializeDatabase();


        app.listen(
            PORT,
            "0.0.0.0",
            () => {

                console.log(
                    `HealthConnect API running on port ${PORT}`
                );
            }
        );

    }

    catch (error) {

        console.error(
            "Failed to start HealthConnect API:",
            error
        );

        process.exit(1);
    }
}


startServer();