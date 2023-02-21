const mysql = require('mysql2');
const inquirer = require('inquirer');
const fs = require('fs');

import emplTracker from './actions/emplTracker';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_tracker_db'
})

const init = () => {
    emplTracker ();
}

init();
