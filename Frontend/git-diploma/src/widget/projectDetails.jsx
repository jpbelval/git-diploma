import React from "react";
import {projet} from './data.js'
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
    let p = useParams();
    let pId = parseInt(p.projectId);
    const proj = projet.filter(projet => projet.projectId == pId);

    const infoProjet = proj.map(proj => 
        <p>{proj.name}</p>
    )

    return (
        <>
        {infoProjet}
        </>
    )
};

export default ProjectDetails;