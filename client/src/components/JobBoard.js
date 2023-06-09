import JobList from './JobList';
import { getJobs } from '../graphql/queries';
import { useEffect, useState } from 'react';

function JobBoard() {
  const [jobs,setJobs] = useState([]);
  const [error,setError] = useState(false);
  // If there is no dependency, this means this will only run once when the compenent is rendered or mounted
  useEffect(()=>{
    // This returns a promise, so we use then to capture the results once available
    //this is equivalent to getJobs().then((jobs)=>setjobs(jobs))
    getJobs().then(setJobs).catch((error)=> {console.log(error);setError(true)});
  },[])

  if(error){
    return <p>Sorry, something went wrong.</p>
  }
  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
