const mysql = require("mysql2");

// Create a connection to the MySQL database
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'sqlsqlsql',
    database: 'ClassManager',
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  console.log('Connected to the database');

  // Define SQL queries to create tables
  const createAssignmentsTable = `
    CREATE TABLE assignments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      github_repo_url VARCHAR(255) NOT NULL,
      creation_date TIMESTAMP NOT NULL
      -- other assignment-related fields
    )
  `;

  const createStudentsTable = `
    CREATE TABLE students (
      id INT AUTO_INCREMENT PRIMARY KEY,
      github_username VARCHAR(100) NOT NULL,
      name VARCHAR(255) NOT NULL
      -- other student-related fields
    )
  `;

  const createAssignmentSubmissionsTable = `
    CREATE TABLE assignment_submissions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      assignment_name VARCHAR(255) NOT NULL,
      student_name VARCHAR(255) NOT NULL,
      submission_date TIMESTAMP NOT NULL
      -- other submission-related fields
    )
  `;
  // Execute the queries to create tables
  connection.query(createAssignmentsTable, (err) => {
    if (err) throw err;
    console.log('Assignments table created');
  });

  connection.query(createStudentsTable, (err) => {
    if (err) throw err;
    console.log('Students table created');
  });

  connection.query(createAssignmentSubmissionsTable, (err) => {
    if (err) throw err;
    console.log('Assignment submissions table created');
  });
  // Close the database connection
  connection.end((err) => {
    if (err) {
      console.error('Error closing the database connection:', err);
    } else {
      console.log('Database connection closed');
    }
  });
});
