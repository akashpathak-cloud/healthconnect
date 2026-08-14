const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db");

const router = express.Router();


/*
 * LOGIN
 * POST /api/auth/login
 */
router.post("/login", async (req, res) => {

    try {

        const { username, password } = req.body;

        if (!username || !password) {

            return res.status(400).json({
                success: false,
                message: "Username and password are required"
            });
        }


        const result = await pool.query(
            `
            SELECT id, username, password_hash, role
            FROM users
            WHERE username = $1
            `,
            [username.trim()]
        );


        if (result.rows.length === 0) {

            return res.status(401).json({
                success: false,
                message: "Invalid username or password"
            });
        }


        const user = result.rows[0];


        const passwordMatch = await bcrypt.compare(
            password,
            user.password_hash
        );


        if (!passwordMatch) {

            return res.status(401).json({
                success: false,
                message: "Invalid username or password"
            });
        }


        req.session.user = {
            id: user.id,
            username: user.username,
            role: user.role
        };


        console.log(
            `User logged in: ${user.username}`
        );


        res.json({
            success: true,
            user: req.session.user
        });

    }

    catch (error) {

        console.error("Login error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});


/*
 * CURRENT USER
 * GET /api/auth/me
 */
router.get("/me", (req, res) => {

    if (!req.session || !req.session.user) {

        return res.status(401).json({
            success: false,
            message: "Not authenticated"
        });
    }


    res.json({
        success: true,
        user: req.session.user
    });
});


/*
 * LOGOUT
 * POST /api/auth/logout
 */
router.post("/logout", (req, res) => {

    req.session.destroy((error) => {

        if (error) {

            console.error("Logout error:", error);

            return res.status(500).json({
                success: false,
                message: "Logout failed"
            });
        }


        res.clearCookie("connect.sid");


        res.json({
            success: true,
            message: "Logged out successfully"
        });
    });
});


module.exports = router;