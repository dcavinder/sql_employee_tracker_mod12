const mysql = require('mysql2');
const inquirer = require('inquirer');
const fs = require('fs');

const db = mysql.createConnection('mysql://root:rootroot@localhost:3306/employee_tracker_db')


inquirer.createPromptModule([{
    message: 'Please select the action you would like to perform',
    type: 'list',
    choices: ['Add a Department', 'Add a Role', 'Add an Employee', 'View all Departments', 'View all Roles',
    'View all Employees', 'Update an Employee Role'],
    name: 'init'
}])
.then(init => {
console.log(init)
})