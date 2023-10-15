import React from 'react'

import './ProjectCard.css'

function ProjectCard(props) {
  const className = `${props.className} ProjectCard-Container`;
  const { photo } = props;
  return (
    <button className={className} onClick={props.onClick}>
        <img src={photo.photoEncode64} alt='Project Banner' className='ProjectCard-Banner'/>
    </button>
  )
}

export default ProjectCard