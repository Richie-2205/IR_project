const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB (make sure MongoDB is running)
mongoose.connect('mongodb://localhost:27017/wellspring', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// User schema
const userSchema = new mongoose.Schema({
    fullName: String,
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    userType: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

// Register endpoint
app.post('/api/register', async (req, res) => {
    const { fullName, username, email, userType, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        return res.status(400).json({ message: 'Username or email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullName, username, email, userType, password: hashedPassword });
    await user.save();
    res.json({ message: 'Registration successful' });
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect password' });
    }
    // Send userType in the response
    res.json({ message: 'Login successful', userType: user.userType });
});

app.listen(5000, () => console.log('Server running on port 5000'));