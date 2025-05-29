document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('#loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const res = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();
            alert(data.message);
            if (res.ok) {
                if (data.userType === 'student') {
                    window.location.href = 'C:\Users\HP\Desktop\Final_Project\reader\student_dashboard.html';
                } else if (data.userType === 'publisher') {
                    window.location.href = 'publisher_dashboard.html';
                }
            }
        });
    }
});