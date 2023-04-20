import { Job, Company } from "./db.js"

// This can be asynchronous so that it returns a promise
// It is normally Asynchronous
//_ denotes unused variables 

const rejectIf = (condition)  =>{
    if(condition){
        throw new Error("Unauthorized");
    }
}
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
        createJob:(_root,{input}, {user}) => {
            rejectIf(!user);
            return Job.create({...input, companyId:user.companyId})},

        deleteJob:async (_root,{id}, {user}) => {
            rejectIf(!user);
            const job = await Job.findById(id);
            rejectIf(job.companyId !== user.companyId)
           return Job.delete(id);
        },
        updateJob:async (_root,{input},{user}) => {
            rejectIf(!user);
            const job = await Job.findById(input.id);
            rejectIf(job.companyId !== user.companyId);          
           return Job.update({...input, companyId:user.companyId})
        }
    },
    Company:{
        jobs:(company) => Job.findAll((job)=> job.companyId === company.id)
    },
    Job: {
        company: (job)=> { return Company.findById(job.companyId);}
    }

}