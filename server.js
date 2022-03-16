const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection(
  {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '2122UWbootcamp',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

startApp = () => {
    inquirer.prompt([
        {
            type: 'rawlist',
            name: 'initialInquiry',
            message: 'Welcome to the employee management program. Please choose one of the following options.',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add an employee', 'Exit program']
        }
    ]).then((response) => {
        switch (response.initialInquiry) {
            case 'View all departments':
                viewAllDepartments();    
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'Add an employee':
                addAnEmployee();
                break;
            case 'Exit program':
                db.end();
                console.log('\n Exiting employee management program. \n');
                return;
            default:
                break;
        }
    })
}

viewAllDepartments = () => {
    db.query('SELECT * FROM departments ', function (err,response) {
        console.table(response);
        startApp();
    });
};

viewAllRoles = () => {
    db.query('SELECT * FROM roles ', function  (err,response) {
        console.table(response);
        startApp();
    })
};

viewAllEmployees = () => {
    db.query('SELECT * FROM employees ', function (err,response) {
        console.table(response);
        startApp();
    });
};

addAnEmployee = () => {
    db.query(`SELECT * FROM roles ;`, (err, response) => {
        if (err) throw err;
        let roles = response.map(role => ({name: role.title, value: role.id }));
        db.query(`SELECT * FROM employees;`, (err, response) => {
            if (err) throw err;
            let employees = response.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.id}));
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'Please add first name for new employee.'
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Please add last name for new employee.'
                },
                {
                    type: 'rawlist',
                    name: 'role',
                    message: 'Please add role for new employee.',
                    choices: roles
                },
                {
                    type: 'rawlist',
                    name: 'manager',
                    message: 'Please add manager for new employee.',
                    choices: employees
                }
            ]).then((response) => {
                db.query(`INSERT INTO employees SET ?`, 
                {
                    first_name: response.firstName,
                    last_name: response.lastName,
                    role_id: response.role,
                    manager_id: response.manager,
                }, 
                (err, response) => {
                    if (err) throw err;
                })
                db.query(`INSERT INTO roles SET ?`, 
                {
                    department_id: response.dept,
                }, 
                (err, response) => {
                    if (err) throw err;
                    console.log(`\n $ New employee successfully added to database. \n`);
                    startApp();
                })
            })
        })
    })
};

startApp();