import {ApolloLink, InMemoryCache, concat, createHttpLink} from "@apollo/client"
import {request} from "graphql-request";
import { getAccessToken } from "../auth";
import { ApolloClient , gql} from "@apollo/client";


const GRAPHQL_URL = "http://localhost:9000/graphql"

const httpLink = createHttpLink({uri:GRAPHQL_URL});

const authLink = new ApolloLink((operation,forward) => {
  const accessToken = getAccessToken();
  if(accessToken){
    operation.setContext({
      headers: {'Authorization': `Bearer ${accessToken}`},
    })
  }
  return forward(operation);
});

const apolloClient = new ApolloClient({
  link:concat(authLink,httpLink),
  cache: new InMemoryCache(),
}) 

// gql is used to tag so that the editor appliers formatting and auto complete
export async function getJobs() {
    const query = gql `
query Jobs {
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
    const {data} = await apolloClient.query({query})
    return data.jobs;
}
// Job: is an alias for the object returned
export async function createJob(input) {
  const mutation = gql `
    mutation CreateJobJobMutation ($input:CreateJobInput!){
  job:createJob(input: $input) {
    id
  }
}
  `;
  
  const {data} = await apolloClient.mutate({
    mutation,
    variables: {input : input}
  });
  return data.job;
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
    const {data} = await apolloClient.query({
      query,
      variables:{id},
    })
    return data.job;
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
    const {data} = await apolloClient.query({
      query,
      variables:{id},
    })
    return data.company;
}

