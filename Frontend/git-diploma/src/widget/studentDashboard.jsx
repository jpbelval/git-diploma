import React, { useState, useEffect } from "react";
import styles from './styles.module.css';
import { projet } from './data.js';
import api from '../api/axiosConfig';
import { Link } from "react-router-dom";

const StudentDashboard = () => {

    const [projects, setProjects] = useState([]);

    const openProjet = projet.filter(projet => projet.remise > Date.now());
    const closedProjet = projet.filter(projet => projet.remise < Date.now());
    const upcomingP = projet.filter(projet => projet.remise > Date.now()).sort(projet => projet.remise).reverse();

    const listeProjet = projects.map((project, index) =>
        <tr key={index}>
            <td><Link to={`/project/${project.id_project}`} params>{project.id_project}</Link></td>
            <td>--:--:--</td>
        </tr>
    );

    const ancienProjet = closedProjet.map(closedProjet =>
        <tr>
            <td>{closedProjet.name}</td>
            <td>{closedProjet.cour}</td>
            <td>--:--:--</td>
        </tr>
    );

    const upcoming = upcomingP.map(upcomingP =>
        <li>
            <p>{upcomingP.name}</p>
            <p>{upcomingP.remise.toLocaleDateString("en-US")}</p>
        </li>
    )

    const getProjects = async () => {
        try {
            const response = await api.get("/api/student/getProjects", {
                params: { cip: "lepl1501" }
            });
            console.log(response);
            setProjects(response.data);
        } catch (err) {
            console.log("Error fetching data:", err);
        }
    };

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <>
        <div className={styles.divContent}>

            <div className={styles.divListe}>
                <div>
                    <h2>projets</h2>
                    <div>
                        <table className={styles.tableProjet}>
                            <thead>
                                <tr>
                                    <th>Identifiant</th>
                                    <th>last commit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listeProjet}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <h2>anciens projets</h2>
                    <div>
                        <table className={styles.tableProjet}>
                            <tr>
                                <th>nom</th>
                                <th>cours</th>
                                <th>last commit</th>
                            </tr>
                            {ancienProjet}
                        </table>
                    </div>
                </div>
            </div>
            <div className={styles.divUpcoming}>
                <h2 className={styles.h2Upcoming}>remise à venir</h2>
                <ul>
                    {upcoming}
                </ul>
            </div>
        </div>
        </>
    );
};

export default StudentDashboard;