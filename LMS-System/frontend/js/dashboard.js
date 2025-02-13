document.addEventListener("DOMContentLoaded", async () => {
    const dashboardContainer = document.querySelector("#dashboard-container");
    const API_URL = "http://localhost:5000/users/me";

    // Function to fetch user data
    async function fetchUserData() {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("You are not logged in. Redirecting to login page.");
            window.location.href = "login.html";
            return;
        }

        try {
            const response = await fetch(API_URL, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const user = await response.json();

            if (response.ok) {
                displayDashboard(user);
            } else {
                alert(`Failed to load user data: ${user.message}`);
                window.location.href = "login.html";
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            alert("An error occurred while loading your dashboard.");
            window.location.href = "login.html";
        }
    }

    // Function to display dashboard content
    function displayDashboard(user) {
        dashboardContainer.innerHTML = `
            <h2>Welcome, ${user.name} (${user.role})</h2>
            <p>Email: ${user.email}</p>
            <p>Role: ${user.role}</p>
        `;

        // Display additional options based on user role
        if (user.role === "admin") {
            dashboardContainer.innerHTML += `
                <a href="manage-users.html" class="btn-primary">Manage Users</a>
                <a href="manage-courses.html" class="btn-primary">Manage Courses</a>
            `;
        } else if (user.role === "instructor") {
            dashboardContainer.innerHTML += `
                <a href="create-course.html" class="btn-primary">Create New Course</a>
                <a href="instructor-courses.html" class="btn-primary">View My Courses</a>
            `;
        } else if (user.role === "student") {
            dashboardContainer.innerHTML += `
                <a href="my-courses.html" class="btn-primary">View My Courses</a>
                <a href="progress.html" class="btn-primary">Track Progress</a>
            `;
        }
    }

    // Fetch and display user data on page load
    await fetchUserData();
});
