SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.dept_name AS department, roles.salary, CONCAT(a.first_name, " ", a.last_name) AS manager
FROM employee
LEFT JOIN roles ON 
employee.role_id = roles.id
LEFT JOIN department ON
department.id = roles.dept_id
LEFT JOIN employee a ON 
a.id = employee.manager_id
ORDER BY employee.id;