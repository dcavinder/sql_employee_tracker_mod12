SELECT roles.id, roles.title, department.dept_name AS department, roles.salary
FROM roles
INNER JOIN department ON roles.dept_id = department.id;