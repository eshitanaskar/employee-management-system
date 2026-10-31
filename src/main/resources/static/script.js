const API_URL = "/api/employees";

// Load all employees
function loadEmployees() {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load employees");
            }
            return response.json();
        })
        .then(employees => {
            const table = document.getElementById("employeeTable");
            table.innerHTML = "";

            // Update total employee count
            document.getElementById("totalEmployees").innerText = employees.length;

            // Calculate total departments
const departments = new Set(
    employees.map(employee => employee.department)
);

document.getElementById("totalDepartments").innerText = departments.size;

// Calculate average salary
const totalSalary = employees.reduce(
    (sum, employee) => sum + Number(employee.salary), 0
);

const averageSalary = employees.length > 0
    ? totalSalary / employees.length
    : 0;

document.getElementById("averageSalary").innerText =
    averageSalary.toFixed(2);

            employees.forEach(employee => {
                const row = `
                    <tr>
                        <td>${employee.id}</td>
                        <td>${employee.name}</td>
                        <td>${employee.department}</td>
                        <td>${employee.salary}</td>
                        <td>
                            <button onclick="editEmployee(${employee.id})">
                                Edit
                            </button>

                            <button onclick="deleteEmployee(${employee.id})">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;

                table.innerHTML += row;
            });
        })
        .catch(error => console.error("Error:", error));
}

// Load employees when page opens
loadEmployees();

// Delete employee
function deleteEmployee(id) {
    if (confirm("Are you sure you want to delete this employee?")) {
        fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to delete employee");
            }

            alert("Employee deleted successfully!");
            loadEmployees();
        })
        .catch(error => {
            alert("Error deleting employee!");
            console.error(error);
        });
    }
}

// Add new employee
document.getElementById("employeeForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const employee = {
        id: Number(document.getElementById("id").value),
        name: document.getElementById("name").value,
        department: document.getElementById("department").value,
        salary: Number(document.getElementById("salary").value)
    };

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to add employee");
        }
        return response.json();
    })
    .then(() => {
        alert("Employee added successfully!");
        document.getElementById("employeeForm").reset();
        loadEmployees();
    })
    .catch(error => {
        alert("Error adding employee!");
        console.error(error);
    });
});

// Edit employee
function editEmployee(id) {
    fetch(`${API_URL}/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Employee not found");
            }
            return response.json();
        })
        .then(employee => {
            const name = prompt("Enter new name:", employee.name);
            const department = prompt("Enter new department:", employee.department);
            const salary = prompt("Enter new salary:", employee.salary);

            if (name === null || department === null || salary === null) {
                return;
            }

            const updatedEmployee = {
                id: id,
                name: name,
                department: department,
                salary: Number(salary)
            };

            fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedEmployee)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Update failed");
                }

                alert("Employee updated successfully!");
                loadEmployees();
            })
            .catch(error => {
                alert("Error updating employee!");
                console.error(error);
            });
        })
        .catch(error => console.error(error));
}

// Search employee by name
document.getElementById("search").addEventListener("input", function() {
    const searchValue = this.value.toLowerCase();

    fetch(API_URL)
        .then(response => response.json())
        .then(employees => {
            const table = document.getElementById("employeeTable");
            table.innerHTML = "";

            const filteredEmployees = employees.filter(employee =>
                employee.name.toLowerCase().includes(searchValue)
            );

            filteredEmployees.forEach(employee => {
                const row = `
                    <tr>
                        <td>${employee.id}</td>
                        <td>${employee.name}</td>
                        <td>${employee.department}</td>
                        <td>${employee.salary}</td>
                        <td>
                            <button onclick="editEmployee(${employee.id})">Edit</button>
                            <button onclick="deleteEmployee(${employee.id})">Delete</button>
                        </td>
                    </tr>
                `;

                table.innerHTML += row;
            });
        })
        .catch(error => console.error("Search error:", error));
});
