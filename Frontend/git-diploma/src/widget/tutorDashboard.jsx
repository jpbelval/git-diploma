import React, { useState, useEffect } from "react";
import styles from './styles.module.css';
import { Link } from "react-router-dom";
import api from '../../api/axiosConfig';
import { useKeycloak } from '@react-keycloak/web'


const TutorDashboard = () =>{
    const { keycloak } = useKeycloak()
    const [course, setCourse] = useState([]);
    let sigle = -1;

    if(!keycloak?.authenticated)
        window.location.href = '/';

    const onValueChange = async (sigle) => {
        sigle = sigle_cours
        };        

    const getCourse = async () => {
        try {
            const response = await api.get("/api/tutor/getCourses", {
                headers: {'Authorization': 'Bearer ' + keycloak.token},
                params: { cip }
            });
            console.log(response);
            setCourse(response.data);
        } catch (err) {
            console.log("Error fetching data:", err);
        }
    };

    const pastCourse = course.filter(course => course.end != null && course.end < Date.now());
    const currentCourse = course.filter(course => course.end != null && course.start < Date.now() && course.end > Date.now());
    const futureCourse = course.filter(course => course.end != null && course.start > Date.now()).sort(course => course.start);

    const pastCourseList = pastCourse.map(pastCourse =>
        <tr>
            <td><Link to={`/courses/${pastCourse.code}`} params>{pastCourse.name}</Link></td>
            <td>{pastCourse.code}</td>
        </tr>
    );

    const currentCourseList = currentCourse.map(currentCourse =>
        <tr>
            <td><Link to={`/courses/${currentCourse.code}`} params>{currentCourse.name}</Link></td>
            <td>{currentCourse.code}</td>
        </tr>
    );

    const futureCourseList = futureCourse.map(futureCourse =>
        <tr>
            <td><Link to={`/courses/${futureCourse.code}`} params>{futureCourse.name}</Link></td>
            <td>{futureCourse.code}</td>
        </tr>
    );

    return(
        <>
        <div className={styles.divContentTuteur}>
            <div className={styles.divListe}>
                <div>
                    <h2>Cours Actifs</h2>
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
                    <h2>Cours à venir</h2>
                    <div>
                        <table className={styles.tableProjet}>
                            <thead>
                                <tr>
                                    <th>nom</th>
                                    <th>sigle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {futureCourseList}
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