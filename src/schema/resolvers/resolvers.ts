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

    assignmentSubmissions: async (_parent: any, args: any, _context: any, _info: any) => {
        const { assignmentId } = args;
        const result = await getAssignmentSubmissions(assignmentId);
        return result;
    },

    hello: () => {
        return "hello, world!"
    }
}