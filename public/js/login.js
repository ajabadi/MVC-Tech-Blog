async function loginFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        try {
            const response = await fetch('/api/users/login', {
                method: 'post',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                // Parse the JSON response and display the error message
                const data = await response.json();
                alert(data.message); // Assuming 'message' contains the error message
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to process the request.');
        }
    } else {
        alert('Please enter both username and password.');
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
