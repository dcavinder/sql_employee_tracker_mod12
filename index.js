const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const fs = require('fs');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_tracker_db'
})

function emplTracker() {
    inquirer.prompt([{
        message: 'Please select the action you would like to perform',
        type: 'list',
        choices: ['Add a Department', 'Add a Role', 'Add an Employee', 'View all Departments', 'View all Roles',
        'View all Employees', 'Update an Employee Role'],
        name: 'action'
    }])
    .then(init => {
    console.log(init)
    
    switch(init.action) {
        case 'Add a Department':
            addDept()
            break
        case 'Add a Role':
            addRole()
            break
        case 'Add an Employee': 
            addEmpl()
            break
        case 'View all Departments':
            viewDepts()
            break
        case 'View all Roles':
            viewRoles()
            break
        case 'View all Employees':
            viewEmployees()
            break
        case 'Update an Employee Role':
            updateEmplRole()
            break
    }
    })
}

const viewEmployees = () => {
    const sql = fs.readFileSync('./queries/viewEmpls.sql').toString();

    db.query(sql, async (err, rows) => {
        if(err) {
            console.log(err);
        } else {
            console.table(rows);
            emplTracker()
        }
    });
}

const viewRoles = () => {
    const sql = fs.readFileSync('./queries/viewRoles.sql').toString();

    db.query(sql, async (err, rows) => {
        if(err) {
            console.log(err);
        } else {
            console.table(rows);
            emplTracker()
        }
    });
};

const viewDepts = () => {
    const sql = fs.readFileSync('./queries/viewDepts.sql').toString();

    db.query(sql, async (err, rows) => {
        if(err) {
            console.log(err);
        } else {
            console.table(rows);
            emplTracker()
        }
    });
};





const addDept = () => {
    const sql = fs.readFileSync('./queries/addDept.sql').toString();
    
    inquirer
        .prompt([{
            message: "Please enter the name of the new Department.",
            type: 'input',
            name: 'name'
        }])
        .then(answer => {
            db.query(sql, answer.name);
            console.table(viewDepts());
        });
};

async function addRole () {
    const sql = fs.readFileSync('./queries/addRole.sql').toString();

    const deptsArray = await db.promise().query('SELECT dept_name, id FROM department')
    
    const deptList = deptsArray [0].map((dept) => {
        return {
            name: dept.name, 
            value: dept.id
        }
    })

    inquirer
        .prompt([
            {
                message: "Please enter the name of the new role.",
                type: 'input',
                name: 'title'
            },
            {
                message: 'Please enter a salary',
                type: 'input',
                name: 'salary'
            },
            {
                message: 'Please select the department this role belongs to',
                type: 'list',
                name: 'department',
                choices: deptList 
            }
        ])
        .then(role => {
            db.query(sql, {
                title: role.title,
                salary: role.salary,
                dept_id: role.department
            });
            console.table(role);
            emplTracker()
        });
}

async function addEmpl () {
    const sql = fs.readFileSync('./queries/addEmpls.sql').toString();

    const rolesArray = await db.promise().query('SELECT title, id FROM roles')
    
    const rolesList = rolesArray[0].map((role) => {
        return {
            name: role.title, 
            value: role.id
        }
    })

    const managersArray = await db.promise().query('SELECT CONCAT(first_name, " ", last_name) AS manager, id FROM employee')
    
    const managerList = managersArray[0].map((manager) => {
        return {
            name: manager.manager, 
            value: manager.id
        }
    })

    inquirer.prompt([{
                message: 'Please enter the first name of the employee you would like to add.',
                type: 'input',
                name: 'first_name'
            },
        
            {
                message: 'Please enter the last name of the employee you would like to add.',
                type: 'input',
                name: 'last_name'
            },
        
            {
                message: "Please select the employee's role.",
                type: "list",
                name: "role_id",
                choices: rolesList
            },
        
            {
                message: "Please indicate if this employee has a manager",
                type: "list",
                name: "hasManager",
                choices: ["yes", "no"]
            }

        ])
        .then(employee => {
            if(employee.hasManager === "Yes"){
                inquirer
                    .prompt([
                        {
                            message: "Please select the manager's name.",
                            type: 'list',
                            name: 'manager_id',
                            choices: managerList
                        }
                    ])
                    .then(reportsTo => {
                        delete employee.hasManager;

                        let newEmployee = {
                            ...employee,
                            ...reportsTo
                        };

                        db.query(sql, {
                            first_name: newEmployee.first_name,
                            last_name: newEmployee.last_name,
                            role_id: newEmployee.role_id,
                            manager_id: newEmployee.manager_id
                        });
                        console.table(newEmployee);
                        emplTracker()
                    })
            } else {
                delete employee.hasManager;

                db.query(sql, {
                    first_name: employee.first_name,
                    last_name: employee.last_name,
                    role_id: employee.role_id,
                    manager_id: null
                });
                console.table(employee);
                emplTracker()
            }
        })
}

async function updateEmplRole () {     
    const employeeArray = await db.promise().query('SELECT CONCAT(first_name, " ", last_name) AS employee, id FROM employee')

    const employeeList = employeeArray[0].map((employee) => {
        return {
            name: employee.employee, 
            value: employee.id
        }
    })

    const rolesArray = await db.promise().query('SELECT title, id FROM roles')
    
    const rolesList = rolesArray[0].map((role) => {
        return {
            name: role.title, 
            value: role.id
        }
    })
    
    inquirer
        .prompt([
            {
                message: "Please select the employee profile you would like to update",
                type: 'list',
                name: 'name',
                choices: employeeList
            },
            {
                message: "Please select the new employee role.",
                type: 'list',
                name: 'role_id',
                choices: rolesList
            }
        ])
        .then(updateEmplRole => {  
            db.query(`UPDATE employee SET role_id = ${updateEmplRole.role_id} WHERE employee.id = ${updateEmplRole.name}`)
            console.table(updateEmplRole);
            emplTracker ()
        })
}

const init = () => {
    emplTracker ();
}

init();
