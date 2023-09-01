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
  const createAssignmentsTable = `--sql
    CREATE TABLE assignments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      github_repo_url VARCHAR(255) NOT NULL,
      creation_date TIMESTAMP NOT NULL
      -- other assignment-related fields
    )
  `;

  const createStudentsTable = `--sql
    CREATE TABLE students (
      id INT AUTO_INCREMENT PRIMARY KEY,
      github_username VARCHAR(100) NOT NULL,
      name VARCHAR(255) NOT NULL
      -- other student-related fields
    )
  `;

  const createAssignmentSubmissionsTable = `--sql
    CREATE TABLE assignment_submissions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      assignment_id INT,
      student_id INT,
      submission_date TIMESTAMP NOT NULL
      -- other submission-related fields
    )
  `;

  const createSubmissionStatsTable = `--sql
    CREATE TABLE submission_stats (
      id INT AUTO_INCREMENT PRIMARY KEY,
      submission_id INT,
      num_test_cases_passed INT,
      points_scored DECIMAL,
      execution_time_ms INT
      -- other submission stats
    )
  `;

  const createAssignmentStatsTable = `--sql
    CREATE TABLE assignment_stats (
      id INT AUTO_INCREMENT PRIMARY KEY,
      assignment_id INT,
      average_score DECIMAL,
      average_speed DECIMAL,
      num_submitted INT
      -- other assignment stats
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

  connection.query(createSubmissionStatsTable, (err) => {
    if (err) throw err;
    console.log('Submission stats table created');
  });

  connection.query(createAssignmentStatsTable, (err) => {
    if (err) throw err;
    console.log('Assignment stats table created');
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
