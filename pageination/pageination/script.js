const API_BASE_URL = 'http://localhost:8080/api/students';
let currentPage = 0;
const pageSize = 10;
let totalPages = 0;

// Auth Modal
const modal = document.getElementById("authModal");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const closeBtn = document.getElementsByClassName("close")[0];
const authTitle = document.getElementById("authTitle");
const authForm = document.getElementById("authForm");

loginBtn.onclick = () => {
    authTitle.textContent = "Login";
    modal.style.display = "block";
}

registerBtn.onclick = () => {
    authTitle.textContent = "Register";
    modal.style.display = "block";
}

closeBtn.onclick = () => {
    modal.style.display = "none";
}

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

authForm.onsubmit = (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log(`${authTitle.textContent}: ${username}, ${password}`);
    // Here you would typically send this data to your backend for authentication
    modal.style.display = "none";
    document.getElementById("mainContent").style.display = "block";
}

function fetchStudents() {
    fetch(`${API_BASE_URL}?page=${currentPage}&size=${pageSize}`)
        .then(response => response.json())
        .then(data => {
            const studentTableBody = document.getElementById('studentTableBody');
            studentTableBody.innerHTML = '';
            data.content.forEach(student => {
                const row = `
                    <tr>
                        <td>${student.id}</td>
                        <td>${student.name}</td>
                        <td>${student.email}</td>
                        <td>
                            <button onclick="editStudent(${student.id})">Edit</button>
                            <button onclick="deleteStudent(${student.id})">Delete</button>
                        </td>
                    </tr>
                `;
                studentTableBody.innerHTML += row;
            });
            totalPages = data.totalPages;
            updatePagination();
        })
        .catch(error => console.error('Error:', error));
}

function updatePagination() {
    document.getElementById('currentPage').textContent = `Page ${currentPage + 1} of ${totalPages}`;
    document.getElementById('prevPage').disabled = currentPage === 0;
    document.getElementById('nextPage').disabled = currentPage === totalPages - 1;
}

document.getElementById('studentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
    })
    .then(response => response.json())
    .then(() => {
        fetchStudents();
        document.getElementById('studentForm').reset();
    })
    .catch(error => console.error('Error:', error));
});

function editStudent(id) {
    const name = prompt("Enter new name:");
    const email = prompt("Enter new email:");
    if (name && email) {
        fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        })
        .then(() => fetchStudents())
        .catch(error => console.error('Error:', error));
    }
}

function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
        })
        .then(() => fetchStudents())
        .catch(error => console.error('Error:', error));
    }
}

document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        fetchStudents();
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    if (currentPage < totalPages - 1) {
        currentPage++;
        fetchStudents();
    }
});

// Navigation functionality
document.querySelectorAll('.slider-menu a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.display = 'none';
        });
        document.querySelectorAll('.slider-menu a').forEach(navLink => {
            navLink.classList.remove('active');
        });
        const targetSection = this.getAttribute('data-section');
        document.getElementById(targetSection).style.display = 'block';
        this.classList.add('active');
    });
});

// Initially hide the main content
document.getElementById("mainContent").style.display = "none";








/*const API_BASE_URL = 'http://localhost:8080/api/students';
let currentPage = 0;
const pageSize = 10;
let totalPages = 0;

function fetchStudents() {
    fetch(`${API_BASE_URL}?page=${currentPage}&size=${pageSize}`, {
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        const studentTableBody = document.getElementById('studentTableBody');
        studentTableBody.innerHTML = '';
        data.content.forEach(student => {
            const row = `
                <tr>
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.email}</td>
                    <td>
                        <button onclick="editStudent(${student.id})">Edit</button>
                        <button onclick="deleteStudent(${student.id})">Delete</button>
                    </td>
                </tr>
            `;
            studentTableBody.innerHTML += row;
        });
        totalPages = data.totalPages;
        updatePagination();
    })
    .catch(error => console.error('Error:', error));
}

function updatePagination() {
    document.getElementById('currentPage').textContent = `Page ${currentPage + 1} of ${totalPages}`;
    document.getElementById('prevPage').disabled = currentPage === 0;
    document.getElementById('nextPage').disabled = currentPage === totalPages - 1;
}

document.getElementById('studentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
        credentials: 'include'
    })
    .then(response => response.json())
    .then(() => {
        fetchStudents();
        document.getElementById('studentForm').reset();
    })
    .catch(error => console.error('Error:', error));
});

function editStudent(id) {
    const name = prompt("Enter new name:");
    const email = prompt("Enter new email:");
    if (name && email) {
        fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
            credentials: 'include'
        })
        .then(() => fetchStudents())
        .catch(error => console.error('Error:', error));
    }
}

function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        .then(() => fetchStudents())
        .catch(error => console.error('Error:', error));
    }
}

document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        fetchStudents();
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    if (currentPage < totalPages - 1) {
        currentPage++;
        fetchStudents();
    }
});

fetchStudents();*/