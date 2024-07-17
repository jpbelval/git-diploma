import React, { useState, useEffect } from "react";
import styles from '../styles.module.css';
import api from '../../api/axiosConfig.js';
import { course } from "../data";
import { Link } from "react-router-dom";
import { useKeycloak } from '@react-keycloak/web'

const TutorDashboard = () =>{
    const [cours, setCours] = useState([]);
    const { keycloak } = useKeycloak();


    const getCours = async () => {
        try {
            const response = await api.get("/api/tutor/getCourses", {
                headers: {'Authorization': 'Bearer ' + keycloak.token},
                params: { cip: keycloak.tokenParsed.preferred_username }
            });
            console.log(response);
            setCours(response.data);
        } catch (err) {
            console.log("Error fetching data:", err);
        }
    };

    useEffect(() => {
        getCours();
    }, []);


    const finished = cours.filter(c => c.remise != null && new Date(c.remise) < Date.now()).sort(c => c.remise).reverse();
    const upcoming = cours.filter(c => c.remise != null && new Date(c.remise) >= Date.now()).sort(c => c.remise).reverse();

    console.log(cours);
    console.log(finished);
    console.log(upcoming);

    const pastCourseList = finished.map(finished =>
        <tr>
            <td><Link to={`/courses/${finished.code}`} params>{finished.name}</Link></td>
            <td>{finished.sigle}</td>
        </tr>
    );

    const currentCourseList = upcoming.map(upcoming =>
        <tr>
            <td><Link to={`/courses/${upcoming.code}`} params>{upcoming.name}</Link></td>
            <td>{upcoming.sigle}</td>
        </tr>
    );

    return(
        <>
        <div className={styles.divContentTuteur}>
            <div className={styles.divListe}>
                <div>
                    <h2>Cours actifs</h2>
                    <div>
                        <table className={styles.tableProjet}>
                            <thead>
                                <tr>
                                    <th>nom</th>
                                    <th>sigle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCourseList}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <h2>Cours finis</h2>
                    <div>
                        <table className={styles.tableProjet}>
                            <thead>
                                <tr>
                                    <th>nom</th>
                                    <th>sigle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pastCourseList}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={styles.divAddButton}>
                    <Link to="/tutorDashboard/addCourse">
                        <button className={styles.buttonForm}>Ajouter un Cours</button>
                    </Link>
                </div>
            </div>
        </div>
        </>
    );
};

export default TutorDashboard;