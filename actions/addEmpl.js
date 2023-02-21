import { emplTracker } from '..';

const inquirer = require('inquirer');
const fs = require('fs');

export default addEmpl = () => {
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
        choices: ["Manager", "Marketing Specialist", "Developer", "Human Resources"]
    },

    {
        message: "Is this employee a Manager",
        type: "list",
        name: "isManager",
        choices: ["yes", "no"]
    }
    ])
        .then(employee => {
            if (employee.isManager === `Yes`) {
                console.log(`--ADDING MANAGER--`)
                delete employee.isManager

                console.log(employee)

                db.query(`INSERT INTO employees SET ?`, employee, err => {
                    if (err) { console.log(err) }
                })
                console.log(`--UNDERLING ADDED--`)
                emplTracker()
            } else if (employee.isManager === `No`) {

                inquirer.prompt([{
                    message: `Please enter a Manager ID.`,
                    type: `input`,
                    name: `manager_id`
                    
                }])
                    .then(response => {
                        console.log(employee)
                        console.log(response)

                        delete employee.isManager

                        let newEmployee = {
                            employee,
                            response
                        }
                        db.query(`INSERT INTO employees SET ?`, newEmployee, err => {
                            if (err) { console.log(err) }
                        })
                        console.log(`--ADDED EMPLOYEE--`)
                        emplTracker()
                    })
            }
        })
}