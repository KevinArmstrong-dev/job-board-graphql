import { Job, Company } from "./db.js"

// This can be asynchronous so that it returns a promise
// It is normally Asynchronous
//_ denotes unused variables 
export const resolvers = {
    Query : {
        job: (_root,{id}) =>{
            return Job.findById(id);
        },
        jobs : ()=> Job.findAll(),
        company: (_root,{id}) => {
            return Company.findById(id);}
    },

    Mutation: {
        createJob:(_root,{input}) => Job.create(input),
        deleteJob:(_root,{id}) => Job.delete(id),
        updateJob:(_root,{input}) => Job.update(input)
    },
    Company:{
        jobs:(company) => Job.findAll((job)=> job.companyId === company.id)
    },
    Job: {
        company: (job)=> { return Company.findById(job.companyId);}
    }

}