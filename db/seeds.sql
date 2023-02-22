INSERT INTO department (dept_name)
VALUES ("HR"),
       ("Marketing"),
       ("Product Development")
       
INSERT INTO roles (title, salary, dept_id)
VALUES  ("Manager", 120000, 1),
		("Product Design", 120000, 2),
		("Marketing Specialist", 85000, 2),
		("Human Resources", 70000, 1),
		("Developer", 90000, 3)
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Carrey", "Thompson", 2, 1),
       ("Joe", "Good", 3, 1),
       ("Patricia", "McGeely", 2, 1),
       ("Tammy", "Brown", 4, 1),
       ("Corey", "Philips", 3, 1),
       ("Paisley", "Simpson", 2, Null),
       ("Brandt", "Rielly", 1, NULL)