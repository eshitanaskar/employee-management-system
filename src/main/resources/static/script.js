const API_URL = "/api/employees";

async function getErrorMessage(response) {
    const errorText = await response.text();

    if (response.status === 409) {
        return "Error: ID already exists";
    }

    try {
        const errorData = JSON.parse(errorText);

        return errorData.detail ||
               errorData.message ||
               errorData.error ||
               "Something went wrong. Please try again.";

    } catch {
        return errorText || "Something went wrong. Please try again.";
    }
}



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
        document.getElementById("totalEmployees").innerText =
            employees.length;

        // Calculate total departments
        const departments = new Set(
            employees.map(employee => employee.department)
        );

        document.getElementById("totalDepartments").innerText =
            departments.size;

        // Calculate average salary
        const totalSalary = employees.reduce(
            (sum, employee) => sum + Number(employee.salary), 0
        );

        const averageSalary = employees.length > 0
            ? totalSalary / employees.length
            : 0;

        document.getElementById("averageSalary").innerText =
            averageSalary.toFixed(2);

        // Display employees in table
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
    .then(async response => {

        if (!response.ok) {
            throw new Error(await getErrorMessage(response));
        }

        alert("Employee deleted successfully!");
        loadEmployees();
    })
    .catch(error => {
        alert(error.message);
        console.error("Delete error:", error);
    });
}


}

// Add new employee
document.getElementById("employeeForm").addEventListener(
"submit",
async function(event) {


    event.preventDefault();

    const employee = {
        id: Number(document.getElementById("id").value),
        name: document.getElementById("name").value,
        department: document.getElementById("department").value,
        salary: Number(document.getElementById("salary").value)
    };

    try {

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        });

        if (!response.ok) {
            throw new Error(await getErrorMessage(response));
        }

        alert("Employee added successfully!");

        document.getElementById("employeeForm").reset();

        loadEmployees();

    } catch (error) {

        alert(error.message);
        console.error("Add employee error:", error);
    }
}


);

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
        const department = prompt(
            "Enter new department:",
            employee.department
        );
        const salary = prompt(
            "Enter new salary:",
            employee.salary
        );

        if (name === null || department === null || salary === null) {
            return;
        }

        const updatedEmployee = {
            id: id,
            name: name,
            department: department,
            salary: Number(salary)
        };

        return fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedEmployee)
        });
    })
    .then(async response => {

        if (!response) {
            return;
        }

        if (!response.ok) {
            throw new Error(await getErrorMessage(response));
        }

        alert("Employee updated successfully!");
        loadEmployees();
    })
    .catch(error => {
        alert(error.message);
        console.error("Edit error:", error);
    });


}

// Search employee by name
document.getElementById("search").addEventListener(
"input",
function() {


    const searchValue = this.value.toLowerCase();

    fetch(API_URL)
        .then(response => {

            if (!response.ok) {
                throw new Error("Failed to search employees");
            }

            return response.json();
        })
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
        .catch(error => console.error("Search error:", error));
}


);