package com.employee.managementsystem.controller;

import com.employee.managementsystem.entity.Employee;
import com.employee.managementsystem.service.EmployeeService;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    // Get all employees
    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    // Get employee by ID
    @GetMapping("/{id}")
    public Optional<Employee> getEmployeeById(@PathVariable Integer id) {
        return employeeService.getEmployeeById(id);
    }

    // Add employee
    @PostMapping
    public Employee addEmployee(@RequestBody Employee employee) {
        return employeeService.addEmployee(employee);
    }

    // Update employee
    @PutMapping("/{id}")
    public Employee updateEmployee(
            @PathVariable Integer id,
            @RequestBody Employee employee) {

        return employeeService.updateEmployee(id, employee);
    }

    // Delete employee
    @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable Integer id) {
        employeeService.deleteEmployee(id);
        return "Employee deleted successfully!";
    }
}