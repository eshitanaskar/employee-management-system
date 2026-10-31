package com.employee.managementsystem.service;

import com.employee.managementsystem.entity.Employee;
import com.employee.managementsystem.repository.EmployeeRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    // Get all employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Get employee by ID
    public Optional<Employee> getEmployeeById(Integer id) {
        return employeeRepository.findById(id);
    }

    // Add employee
    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Update employee
    public Employee updateEmployee(Integer id, Employee updatedEmployee) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        employee.setName(updatedEmployee.getName());
        employee.setDepartment(updatedEmployee.getDepartment());
        employee.setSalary(updatedEmployee.getSalary());

        return employeeRepository.save(employee);
    }

    // Delete employee
    public void deleteEmployee(Integer id) {
        employeeRepository.deleteById(id);
    }
}