import { getAssignmentSubmissions, getAssignments } from "../../db/controllers/assignments";
import { getStudents } from "../../db/controllers/students"
import { GraphQLResolveInfo } from "graphql";

export const queryResolvers = {
    students: async () => {
        const result = await getStudents();
        return result;
    },

    assignments: async () => {
        const result = await getAssignments();
        return result;
    },

    assignmentSubmissions: async (args: any) => {
        const { assignment } = args;
        console.log(assignment);
        const result = await getAssignmentSubmissions(assignment);
        return result;
    },

    hello: () => {
        return "hello, world!"
    }
}