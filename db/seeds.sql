

INSERT INTO department (dept_name)
VALUES ("HR"),
       ("Marketing"),
       ("Product Development"),

INSERT INTO roles (title, salary, dept_id)
VALUES ("Manager", 120000, 2),
       ("Marketing Specialist", 85000, 2),
       ("Human Resources", 70000, 1),
       ("Developer", 90000, 4),

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Carrey", "Thompson", 2, 2),
       ("Joe", "Good", 2, 1),
       ("Patricia", "McGeely", 4, 7),
       ("Tammy", "Brown", 3, 3),
       ("Corey", "Philips", 4, 2),
       ("Paisley", "Simpson", 1, Null),
       ("Brandt", "Rielly", 1, NULL),