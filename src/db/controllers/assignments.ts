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
    query = `--sql
        SELECT
students.name AS student_name,
  assignment_submissions.submission_date,
  assignments.name as assignment_name
  
FROM
  students
JOIN
  assignment_submissions ON students.id = assignment_submissions.student_id
JOIN
  assignments ON assignment_submissions.assignment_id = assignments.id
  `;
  }
  const [rows, fields] = await pool.execute(query);
  return rows;
};
