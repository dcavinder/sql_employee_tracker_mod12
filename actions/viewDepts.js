import { emplTracker } from '../index.js'

export default function viewDepts() {
    const sqlQuery = fs.readFileSync('./queries/viewDepts.sql').toString();

    db.query(sqlQuery, async (err, rows) => {
        if(err) {
            console.log(err);
        } else {
            console.table(rows);
            emplTracker()
        }
    });
};