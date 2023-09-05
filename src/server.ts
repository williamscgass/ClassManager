import express, {Express, Request, Response} from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import graphql, {buildSchema} from 'graphql';
import 'graphql-import-node';
import mysql from 'mysql2';
import pool from './db/connection';
import fs from "fs";
import { queryResolvers } from './schema/resolvers/resolvers';

const gSchema = fs.readFileSync("./src/schema/schema.graphql", "utf8");
// Construct a schema, using GraphQL schema language
const schema = buildSchema(gSchema);
console.log(gSchema)

// The root provides a resolver function for each API endpoint
const root = queryResolvers;

const app = express()
app.use(cors());
app.use(
  "/api",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)
app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")