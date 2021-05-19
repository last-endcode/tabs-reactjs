import React, { useState, useEffect } from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';

const url = 'https://course-api.com/react-tabs-project';

function App() {
  // loading default is true
  const [loading, setLoading] = useState(true);
  // menampung value
  const [value, setValue] = useState(0);
  // empty array and will update by api
  const [jobs, setJobs] = useState([]);

  const jobsAPI = async () => {
    const response = await fetch(url);
    const data = await response.json();
    // update empty array
    setJobs(data);
    // create be false for loading
    setLoading(false);
  };

  // inside to useEffect for passing reference
  useEffect(() => {
    jobsAPI();
  }, []);

  if (loading) {
    return (
      <div className='loading'>
        <h2>mohon tunggu</h2>
      </div>
    );
  }

  // destructuring dan masukan ke jobs dgn index default value (0)
  const { company, title, duties, dates } = jobs[value];
  return (
    <div className='section' transition-style='in:square:center'>
      <div className='title'>
        <h2>experience work</h2>
        <div className='underline'></div>
      </div>
      <div className='jobs-center'>
        {/* button-container */}
        <div className='button-container'>
          {jobs.map((item, index) => {
            return (
              <button
                onClick={() => setValue(index)}
                className={`job-btn ${index === value && `active-btn`}`}
              >
                {item.company}
              </button>
            );
          })}
        </div>
        {/* jobs-info */}
        <div className='job-info'>
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className='date'>{dates}</p>

          {duties.map((duties, index) => {
            // use flex
            return (
              <div className='job-desc'>
                <FaAngleDoubleRight></FaAngleDoubleRight>
                <p>{duties}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div class='more-btn'>
        <button className='btn-more'>more info </button>
      </div>
    </div>
  );
}

export default App;
