const express = require("express");
const pool = require("../db");

const router = express.Router();

/*
 * Authentication middleware
 */
function requireAuth(req, res, next) {
    if (!req.session || !req.session.user) {
        return res.status(401).json({
            success: false,
            message: "Not authenticated"
        });
    }

    next();
}


/*
 * GET ALL STUDIES
 * GET /api/studies
 */
router.get("/", requireAuth, async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT
                id,
                patient_name,
                mrn,
                study_date,
                modality,
                study_description,
                priority,
                status,
                radiologist,
                created_at
            FROM studies
            WHERE radiologist = $1
            ORDER BY
                CASE
                    WHEN priority = 'Urgent' THEN 1
                    ELSE 2
                END,
                study_date DESC
        `, [req.session.user.username]);

        res.json({
            success: true,
            studies: result.rows
        });

    } catch (error) {

        console.error("Get studies error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to retrieve studies"
        });
    }
});


/*
 * GET STUDY BY ID
 * GET /api/studies/:id
 */
router.get("/:id", requireAuth, async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT
                id,
                patient_name,
                mrn,
                study_date,
                modality,
                study_description,
                priority,
                status,
                radiologist,
                created_at
            FROM studies
            WHERE id = $1
              AND radiologist = $2
        `, [
            req.params.id,
            req.session.user.username
        ]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Study not found"
            });
        }

        res.json({
            success: true,
            study: result.rows[0]
        });

    } catch (error) {

        console.error("Get study error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to retrieve study"
        });
    }
});


/*
 * UPDATE STUDY STATUS
 * PATCH /api/studies/:id/status
 */
router.patch("/:id/status", requireAuth, async (req, res) => {

    try {

        const { status } = req.body;

        const allowedStatuses = [
            "Unread",
            "In Review",
            "Reported"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status"
            });
        }

        const result = await pool.query(`
            UPDATE studies
            SET status = $1
            WHERE id = $2
              AND radiologist = $3
            RETURNING
                id,
                patient_name,
                mrn,
                study_date,
                modality,
                study_description,
                priority,
                status,
                radiologist,
                created_at
        `, [
            status,
            req.params.id,
            req.session.user.username
        ]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Study not found"
            });
        }

        res.json({
            success: true,
            study: result.rows[0]
        });

    } catch (error) {

        console.error("Update study status error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update study"
        });
    }
});


module.exports = router;