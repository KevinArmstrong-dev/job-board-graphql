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
// Job: is an alias for the object returned
export async function createJob(input) {
  const query = gql `
    mutation CreateJobJobMutation ($input:CreateJobInput!){
  job:createJob(input: $input) {
    id
  }
}
  `;
  const variables = {input};
  const {job} = await request(GRAPHQL_URL,query,variables)
  return job;
}

// Job: is an alias for the object returned
export async function deleteJob(id) {
  const query = gql `
    mutation CreateJobJobMutation ($id:ID!){
  job:deleteJob(id: $id) {
    id
    title
  }
}
  `;
  const variables = {id};
  const {job} = await request(GRAPHQL_URL,query,variables)
  return job;
}
export async function getJob(id) {
    const query = gql `
      query jobQuery($id:ID!) {
        job(id: $id) {
          id
          title 
          company {
            name
            id
            description
          }
          description
      }
    }
    `;
    const variables = {id}
    const {job} = await request(GRAPHQL_URL,query,variables)
    return job;
}

export async function getCompany(id) {
  const query = gql `
    query CompanyQuery($id:ID!) {
      company(id: $id) {
          id
          name
          description
          jobs{
            id
            title
          }
        }
      }
  `;
  const variables = {id};
  const {company} = await request(GRAPHQL_URL,query,variables)
  return company;
}
