import React from "react";
import styles from './styles.module.css';
import { course, projet } from "./data";
import { useParams, Link } from "react-router-dom";

const CourseDetails = () => {
    const { code } = useParams();
    const cours = course.filter(course => course.code === code);
    const coursProj = projet.filter(projet => projet.cour === code);


    const courseInfo = cours.map(cours => 
        <p>{cours.name}, {cours.code}</p>
    )

    const courseStart = cours.map(cours =>
        <p>Start Date: {cours.start.toLocaleDateString("en-US")}</p>
    )

    const courseEnd = cours.map(cours =>
        <p>End Date: {cours.end.toLocaleDateString("en-US")}</p>
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
                    <h1>Course Info:</h1>
                    <div>
                        <h2>{courseInfo}</h2>
                        {courseStart}
                        {courseEnd}
                    </div>
                </div>
                <div>
                    <h2>Projects:</h2>
                    <div>
                        <table className={styles.tableProjet}>
                            <thead>
                                <tr>
                                    <th>Team</th>
                                    <th>Members</th>
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