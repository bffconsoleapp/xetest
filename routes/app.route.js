// import User from '../controller/user.controller.js'; // Importing user controller
import verifyUser from "../middleware/auth.middleware.js"; // Importing Authentication middleware
import { promises as fs } from 'fs'; // Importing the promises version of 'fs'
import path from 'path';
import { fileURLToPath } from 'url';

import * as User from '../controller/user.controller.js'; // Import all named exports as User

import multer from "multer";
import Tesseract from "tesseract.js";

// Handling __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes = (app) => {
    /**
     * @openapi
     * /api/healthcheck:
     *  get:
     *     tags:
     *     - Healthcheck
     *     description: Responds if the app is up and running
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: App is up and running
     */
    app.get("/api/healthcheck", (req, res) => res.sendStatus(200));

    /**
     * @openapi
     * /api/register:
     *  post:
     *     tags:
     *     - User
     *     description: Register a new user
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               fname:
     *                 type: string
     *                 description: First name of the user
     *               lname:
     *                 type: string
     *                 description: Last name of the user
     *               email:
     *                 type: string
     *                 description: Email address of the user
     *               password:
     *                 type: string
     *                 description: Password for the user account
     *               mobile:
     *                 type: string
     *                 description: Mobile number of the user
     *               gender:
     *                 type: string
     *                 description: Gender of the user
     *     responses:
     *       200:
     *         description: User registered successfully
     */
    app.post('/api/register', User.register);

    /**
     * @openapi
     * /api/login:
     *  post:
     *     tags:
     *     - User
     *     description: Login a user
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 description: Email address of the user
     *               password:
     *                 type: string
     *                 description: Password for the user account
     *     responses:
     *       200:
     *         description: User logged in successfully
     */
    app.post('/api/login', User.login);

    /**
     * @openapi
     * /api/profileDetails:
     *  get:
     *     tags:
     *     - User
     *     description: Get user profile details
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: User profile details retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                 statusCode:
     *                   type: integer
     *                 data:
     *                   type: object
     *                   properties:
     *                     _id:
     *                       type: string
     *                     fname:
     *                       type: string
     *                     lname:
     *                       type: string
     *                     email:
     *                       type: string
     *                     mobile:
     *                       type: string
     *                     gender:
     *                       type: string
     *       400:
     *         description: Invalid Token or Something Went Wrong
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                 statusCode:
     *                   type: integer
     */
    app.get('/api/profileDetails', verifyUser, User.profileDetails);

    /**
     * @openapi
     * /api/logout:
     *  get:
     *     tags:
     *     - User
     *     description: Logout the current logged-in user
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Logout Successful
     *       400:
     *         description: Something Went Wrong, Please Try Again
     */
    app.get('/api/logout', verifyUser, User.logout);
    
    /**
     * @openapi
     * /api/users:
     *  get:
     *     tags:
     *     - User
     *     description: Get all users
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Users retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                 statusCode:
     *                   type: integer
     *                 data:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       _id:
     *                         type: string
     *                       fname:
     *                         type: string
     *                       lname:
     *                         type: string
     *                       email:
     *                         type: string
     *                       mobile:
     *                         type: string
     *                       gender:
     *                         type: string
     *       400:
     *         description: Something Went Wrong, Please Try Again
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                 statusCode:
     *                   type: integer
     */
    app.get('/api/users', verifyUser, User.getAllUsers);


     /**
     * @openapi
     * /api/tickets:
     *  get:
     *     tags:
     *     - Data
     *     description: Get static JSON data
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: JSON data retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *       400:
     *         description: Something Went Wrong, Please Try Again
     */
     app.get('/api/tickets', verifyUser, async (req, res) => {
        const dataPath = path.join(__dirname, '../assets/data/data.json');

        try {
            const data = await fs.readFile(dataPath, 'utf8');
            
            res.status(200).send({
                'message': 'Posts fetched successfully',
                'statusCode': 200,
                'data': JSON.parse(data)
            });
        } catch (err) {
            res.status(400).send({
                'message': "Something Went Wrong, Please Try Again",
                'statusCode': 400
            });
        }
    });




    /**
     * OCR implementation
     */
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './routes/uploads/');
        },

        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    })

    const upload = multer({ storage: storage });

    app.post('/api/upload', upload.array('uploadedImage', 10), (req, res) => {  //  10 is a maximum count of files can be upload from client side.
        console.log("Requested files: ", req.files.length);

        const promises = req.files.map(file => {
            return Tesseract.recognize(
                file.path,
                'eng',
                {
                    logger: info => console.log(info)
                }
            );
        });

        Promise.all(promises)
            .then(results => {
                res.json(results.map(result => result.data.text));
            })
            .catch(err => {
                res.status(500).send('Error processing files.');
            });
    })
}

export default routes;