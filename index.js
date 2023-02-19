const mysql = require('mysql2');
const inquirer = require('inquirer');
const fs = require('fs');
const { allowedNodeEnvironmentFlags } = require('process');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_tracker_db'
})

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