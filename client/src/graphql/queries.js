import {request, gql} from "graphql-request";

const GRAPHQL_URL = "http://localhost:9000/graphql"

// gql is used to tag so that the editor appliers formatting and auto complete
export async function getJobs() {
    const query = gql `
query  {
  jobs {
    description
    id
    title,
    company {
      name
    }
  }
}
    `;
    const {jobs} = await request(GRAPHQL_URL,query)
    console.log(jobs);
    return jobs;
}
export async function getJob() {
    const query = gql `
query jobQuery($id:ID!) {
job(id: $id) {
 id
 title 
 company {
   name
 }
 description
}
}
    `;
    const {jobs} = await request(GRAPHQL_URL,query)
    console.log(jobs);
    return jobs;
}
