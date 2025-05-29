document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form values
        const fullName = document.getElementById('fullName').value;
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const userType = document.getElementById('userType').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Basic validation
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Send registration data to backend
        const res = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName, username, email, userType, password })
        });

        const data = await res.json();
        alert(data.message);

        if (res.ok) {
            window.location.href = 'login.html';
        }
    });
});

// Install: npm install express-validator
const { body, validationResult } = require('express-validator');

app.post('/api/register', [
    body('email').isEmail(),
    body('username').isLength({ min: 3 }),
    body('password').isLength({ min: 8 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // ...rest of registration logic
});