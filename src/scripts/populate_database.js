const mysql = require("mysql2");

// Create a connection to the MySQL database
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'sqlsqlsql',
    database: 'ClassManager',
});

connection.connect(async (err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }

    console.log('Connected to the database');

    // Insert mock data
    await populateData();

    connection.end((err) => {
        if (err) {
            console.error('Error closing the database connection:', err);
        } else {
            console.log('Database connection closed');
        }
    });
});

async function populateData() {
    connection.query("DELETE FROM assignment_submissions")
    connection.query("DELETE FROM students")
    connection.query("DELETE FROM assignments")

    // Populate assignments
    const assignmentSql = 'INSERT INTO assignments (name, github_repo_url, creation_date) VALUES ?';
    const assignmentValues = [
        ['Homework 1', 'https://github.com/yourusername/hw1', new Date()],
        ['Midterm', 'https://github.com/yourusername/midterm', new Date()],
        ['Final Project', 'https://github.com/yourusername/final', new Date()],
    ];
    await queryAsync(assignmentSql, [assignmentValues]);
    console.log('Assignments populated');

    // Populate students
    const studentSql = 'INSERT INTO students (name, github_username) VALUES ?';
    const studentValues = [
        ['Alice', 'alice123'],
        ['Bob', 'bob456'],
        ['Charlie', 'charlie789'],
        ['David', 'david321'],
        ['Eve', 'eve654'],
    ];
    await queryAsync(studentSql, [studentValues]);
    console.log('Students populated');

    // Simulate assignment submissions
    // Simulate assignment submissions
    const submissionSql = 'INSERT INTO assignment_submissions (student_id, assignment_id, submission_date) VALUES ?';
    const submissionValues = [
        [1, 1, new Date()], // Student 1 submitted Assignment 1
        [2, 1, new Date()], // Student 2 submitted Assignment 1
        [3, 1, new Date()], // Student 3 submitted Assignment 1
        // ... (add more submissions)
    ];
    await queryAsync(submissionSql, [submissionValues]);
    console.log('Submissions populated');
}

function queryAsync(sql, values) {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                resolve(result);
            }
        });
    });
}