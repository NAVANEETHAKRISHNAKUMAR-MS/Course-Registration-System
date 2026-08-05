 function fetchCourses() {
  fetch('https://caboose-crafter-delusion.ngrok-free.dev/courses')
            .then(response => response.json())
            .then(data => {
                const tbodyy = document.getElementById('courseTableBody');
                data.forEach(course => {
                    const row = `<tr>
                        <td>${course.courseId}</td>
                        <td>${course.courseName}</td>
                        <td>${course.trainer}</td>
                        <td>${course.durationInWeeks}</td>
                    </tr>`
                    tbodyy.innerHTML += row;
                });
            })
            .catch(error => console.error('Error fetching courses:', error));
        }
        // Popup open function
function openLogin() {
    document.getElementById("loginPopup").style.display = "block";
}

// Popup close function
function closeLogin() {
    document.getElementById("loginPopup").style.display = "none";
}
function fetchEnrolledCourses() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("https://caboose-crafter-delusion.ngrok-free.dev/admin/courses/enrolledStudents", {

        method: "GET",

        headers: {
            Authorization: "Basic " + btoa(username + ":" + password)
        }

    })

    .then(response => {

        if(response.status==401){
            throw new Error("Invalid Username or Password");
        }

        if(response.status==403){
            throw new Error("Access Denied");
        }

        return response.json();

    })

    .then(data=>{

        // Hide popup
        document.getElementById("loginPopup").style.display="none";

        // Show table
        document.getElementById("studentTable").style.display="table";

        const tbody=document.getElementById("enrolledCoursesBody");

        tbody.innerHTML="";

        data.forEach(student=>{

            tbody.innerHTML += `
                <tr>
                    <td>${student.name}</td>
                    <td>${student.emailId}</td>
                    <td>${student.courseName}</td>
                </tr>
            `;

        });

    })

    .catch(error=>{

        alert(error.message);

    });

}