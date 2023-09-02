import { GraphQLResolveInfo } from "graphql";
import pool from "../connection";

export const getAssignments = async () => {
  const [rows, fields] = await pool.execute(`SELECT * FROM assignments`);
  return rows;
};

export const getAssignmentSubmissions = async (
  assignment: string | undefined
) => {
  let query = "";
  if (!assignment) {
    query = /*sql*/ `
        SELECT
        students.name AS student,
        assignment_submissions.submission_date,
        assignments.name as assignment
        FROM
        students
        JOIN
        assignment_submissions ON students.github_username = assignment_submissions.student_name
        JOIN
        assignments ON assignment_submissions.assignment_name = assignments.name
  `;
  }
  else {
    query = /*sql*/ `
        SELECT
        students.name AS student,
        assignment_submissions.submission_date,
        assignments.name as assignment
        FROM
        students
        JOIN
        assignment_submissions ON students.github_username = assignment_submissions.student_name
        JOIN
        assignments ON assignment_submissions.assignment_name = assignments.name
        WHERE
        assignments.name = "${assignment}"
  `;
  }
  console.log(query);
  const [rows, fields] = await pool.execute(query);
  return rows;
};
