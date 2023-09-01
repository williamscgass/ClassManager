import { GraphQLResolveInfo } from "graphql";
import pool from "../connection";

export const getStudents = async () => {
    const [rows, fields] = await pool.execute(
        `SELECT * FROM students`
    );
    return rows;
}