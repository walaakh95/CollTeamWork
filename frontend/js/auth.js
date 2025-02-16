document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login-form");
    const registerForm = document.querySelector("#register-form");

    // Base URL for API requests
    const API_URL = "http://localhost:3000/api/auth";

    // Login functionality
function loginFunc() {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.querySelector("password").value;

            try {
                const response = await fetch(`${API_URL}/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });

                const result = await response.json();
              

                if (response.ok) {
                    alert("Login successful!");
                    localStorage.setItem("token", result.token);

                    if(result.user.role === "admin"){
                        window.location.href = "dashboard.html";
                    }
                    else if(result.user.role === "instructor"|| result.user.role === "student"){
                        window.location.href = "index.html";
                    }


                } else {
                    alert(`Login failed: ${result.message}`);
                }
            } catch (error) {
                console.error("Error during login:", error);
                alert("An error occurred while logging in.");
            }
        });
}
function registerFunc(){
            registerForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const name = document.getElementById("name").value;

            try {
                const response = await fetch(`${API_URL}/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password, name}),
                });

                const result = await response.json();

                if (response.ok) {
                    alert("Registration successful! You can now log in.");
                    window.location.href = "login.html";
                } else {
                    alert(`Registration failed: ${result.message}`);
                }
            } catch (error) {
                console.error("Error during registration:", error);
                alert("An error occurred while registering.");
            }
        });
    }

    // Token-based redirection (if needed)
    const token = localStorage.getItem("token");
    if (token && window.location.pathname.includes("login.html")) {
        window.location.href = "dashboard.html";
    }
});
