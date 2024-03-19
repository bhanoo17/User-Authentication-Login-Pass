import express from 'express'; 
import { users } from './src/user.data';
import bcrypt from 'bcrypt';  


const app = express();


app.use(express.json());


app.get('/', (req, res) => {
    res.json(user)
    res.send("Hello World this is Home Page"); 
});

// Route for user login
app.post('/user', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
    
        const newUser = {
            name: req.body.email,
            password: hashedPassword
        }
        user.push(newUser)
        res.status(200).send()
    } catch (error) {
        console.log("Something went wrong");
    }
});


app.post('/user/login', async (req, res) => {

    const user = users.find((user) => {
        return user.email === req.body.email
    })

    if(user == null){
        res.status(400).send("User not found")
    }

    try {
        const isPasswordIsCorrect = await bcrypt.compare(req.body.password, user.password)

        if(isPasswordIsCorrect){
            res.send("Success").status(200)
        }
        else{
            res.send("Not Allowed")
        }
    } catch (error) {
        res.status(500).send()
    }
   
});










// Starting the server on port 3000
app.listen(3000, () => {
    console.log("Server is running on PORT: 3000"); // Logging a message when the server starts
});
