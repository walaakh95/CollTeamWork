document.addEventListener("DOMContentLoaded", async () => {
    const coursesList = document.getElementById("coursesList");
    const API_URL = "http://localhost:3000/api/user/course";

    async function fetchCourses() {
        try {
            const response = await fetch(`${API_URL}`);
            const courses = await response.json();

            if (response.ok) {
                displayCourses(courses);
            } else {
                coursesList.innerHTML = `<p>Failed to load courses: ${courses.message}</p>`;
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
            coursesList.innerHTML = `<p>An error occurred while fetching courses.</p>`;
        }
    }

    function displayCourses(courses) {
        coursesList.innerHTML = "";

        if (courses.length === 0) {
            coursesList.innerHTML = `<tr><td>No courses available at the moment</td></tr>`;
            return;
        }

        courses.forEach(course => {
            const courseRow = document.createElement("tr");
            courseRow.classList.add("course-Row");
            courseRow.innerHTML = `
                <td>${course.title}</td>
                <td>${course.description}</td>
                <td><a href="course-detail.html?id=${course._id}" class="btn-secondary">View Course</a></td>
            `;
            coursesList.appendChild(courseRow);
            courseRow.appendChild(coursesList);
        });
    }

    // Initial fetch of courses when the page loads
    await fetchCourses();
});
