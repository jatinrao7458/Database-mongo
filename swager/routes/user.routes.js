const express= require("express")
const User = require("./models/user.js")

const router = express.Router()
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - email
 *         - isActive
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the user
 *         name:
 *           type: string
 *           description: Full name of the user
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         age:
 *           type: number
 *           description: Age of the user
 *         isActive:
 *           type: boolean
 *           description: Indicates if the user account is active
 *       example:
 *         id: "u12345"
 *         name: "Rahul Sharma"
 *         email: "rahul.sharma@example.com"
 *         age: 22
 *         isActive: true
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router