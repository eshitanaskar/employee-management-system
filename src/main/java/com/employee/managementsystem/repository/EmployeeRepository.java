package com.employee.managementsystem.repository;

import com.employee.managementsystem.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

}
