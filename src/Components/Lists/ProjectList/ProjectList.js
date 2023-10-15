import React from 'react'

import './ProjectList.css'
import ProjectCard from '../../Cards/ProjectCard/ProjectCard';
import { useNavigate } from 'react-router-dom';


function ProjectList(props) {
  const className = `${props.className} ProjectList-Container`;

  const navigate = useNavigate();

  const OnNavigateProject = (projectId) => {
    navigate('/Project', {state: { projectId }});
  }

  return (
    <div className={className}>
        {props.ProjectListsData?.length === 0 ? (
          <>
            <p className='paragraph1'>There is no project yet!</p>
          </>
        ) : 
        (props.ProjectListsData?.map(project => (
          <ProjectCard key={project.projectId} 
                       photo={project.projectPhoto}
                       onClick={() => OnNavigateProject(project.projectId)}/>
          )
        ))}
    </div>
  )
}

export default ProjectList