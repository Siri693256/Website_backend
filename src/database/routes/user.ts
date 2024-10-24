import express, {Request,Response} from 'express';
import user from '../models/user';
import bcrypt from "bcrypt";

const userRouter = express.Router();

userRouter.post('/post', async (req:any,res:any) => {
    try {
        const { name, age, email, password } = req.body;    

        // Validate name
        if (!name || name.trim().length === 0) {
            return res.status(400).send({ message: "Please enter your name" });
        }

        // Validate age
        if (age === undefined || age === null || isNaN(age) || age <= 0) {
            return res.status(400).send({ message: "Please enter a valid age" });
        }

        // Validate email
        if (!email || email.trim().length === 0) {
            return res.status(400).send({ message: "Please enter your email" });
        }

        // Validate password
        if (!password || password.trim().length === 0) {
            return res.status(400).send({ message: "Please enter your password" });
        }

        // Hash password
        const password_hashed = await bcrypt.hash(password, 10);
        console.log("hashed_password", password_hashed);

        // Create user object
        const createUserObject : any = {
            name,
            age,
            email,
            password: password_hashed  // Use the hashed password
        };

        // Create the user (replace with actual DB call)
        const createUser = await user.create(createUserObject);

        // Respond with success
        res.status(200).send({
            message: "User registered successfully",
            data: createUser
        });

    } catch (error:any) {
        console.error(error);
        return res.status(500).send({ error: error.message });
    }
});

userRouter.get('/', async (req, res) => {
    try {
      const users = await user.findAll(); // Fetch all users
      res.status(200).json(users); // Send the users as a response
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving users.' });
    }
  });

export default userRouter;
