import React, { useState, useEffect } from "react";
import styles from './styles.module.css';
import { Link } from "react-router-dom";
import api from "../api/axiosConfig"
import { useKeycloak } from '@react-keycloak/web'


const CourseDetails = () => {

    const { keycloak } = useKeycloak()
    const [projects, setProjects] = useState([]);
    let id_project = -1;

    if(!keycloak?.authenticated)
        window.location.href = '/';

    const onValueChange = async (project_id) => {
        id_project = project_id;
    }

    const getProjects = async () => {
        try {
            const response = await api.get("/api/tutor/getProjects", {
                headers: {'Authorization': 'Bearer ' + keycloak.token},
                params: { sigle }
            });
            console.log(response);
            setProjects(response.data);
        } catch (err) {
            console.log("Error fetching data:", err);
        }
    }





    const courseInfo = cours.map(cours => 
        <p>{cours.name}, {cours.code}</p>
    )

    const courseStart = cours.map(cours =>
        <p>début: {cours.start.toLocaleDateString("en-US")}</p>
    )

    const courseEnd = cours.map(cours =>
        <p>fin: {cours.end.toLocaleDateString("en-US")}</p>
    )

    const projLink = coursProj.map(project => (
        <tr>
            <td key={project.projectId} className={styles.tableSectionName}>
                <Link to={`/project/${project.projectId}`} params>{project.name}</Link>              
            </td>
            <td className={styles.tableSectionMembers}>aucun membre a date lol</td>
        </tr>
    ))

    return (
        <>
        <div className={styles.divContentTuteur}>
            <div className={styles.divListe}>
                <div>
                    <h1>cours:</h1>
                    <div>
                        <h2>{courseInfo}</h2>
                        {courseStart}
                        {courseEnd}
                    </div>
                </div>
                <div>
                    <h2>équipes:</h2>
                    <div>
                        <table className={styles.tableProjet}>
                            <thead>
                                <tr>
                                    <th>équipe</th>
                                    <th>membres</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projLink}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>    
        </div>
        </>
    );
};

export default CourseDetails;