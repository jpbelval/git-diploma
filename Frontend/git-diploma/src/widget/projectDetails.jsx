import React, {useEffect, useState} from "react";
import {projet} from './data.js'
import { useParams } from "react-router-dom";
import axios from 'axios';
import styles from './styles.module.css';


const ProjectDetails = () => {
    let p = useParams();
    let pId = parseInt(p.projectId);
    const proj = projet.filter(projet => projet.projectId == pId);

    const [project, setProject] = useState([]);

    useEffect(() => {
        const fetchProjet = async () => {
            const response = await axios.get('/api/repository/project')
            setProject(response.data)
        };
        fetchProjet();
    }, []);


    const infoProjet = proj.map(proj => 
        <p>{proj.name}</p>
    )

    return (
        <>
        <div className={styles.projectContainer}>
            <h2>Repository Files</h2>
            <div className={styles.projectFileList}>
                {project.map(project => (
                    <div className={styles.projectItem} key={project.path}>
                        <div className={styles.projectPath}>{file.path}</div>
                        <div className={styles.projectSize}>{file.size} bytes</div>
                        <div className={styles.projectUser}>{file.user}</div>
                        <div className={styles.projectDate}>{new Date(file.date).toLocaleString()}</div>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
};

export default ProjectDetails;