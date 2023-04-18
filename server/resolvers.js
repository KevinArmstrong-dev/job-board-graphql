import { Job, Company } from "./db.js"

// This can be asynchronous so that it returns a promise
// It is normally Asynchronous
//_ denotes unused variables 
export const resolvers = {
    Query : {
        job: (_root,{id}) =>{
            return Job.findById(id);
        },
        jobs : ()=> Job.findAll()
    },
    Job: {
        company: (job)=> { return Company.findById(job.companyId);}
    }
}