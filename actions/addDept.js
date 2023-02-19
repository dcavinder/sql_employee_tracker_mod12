import { viewDepts } from './viewDepts';

export default function addDept () {
    const sqlQuery = fs.readFileSync('./queries/addDept.sql').toString();
    
    inquirer
        .prompt([{
            message: "Please enter the name of the new department.",
            type: 'input',
            name: 'name'
        }])
        .then(userInput => {
            db.query(sqlQuery, userInput.name);
            console.table(viewDepts());
        });
}