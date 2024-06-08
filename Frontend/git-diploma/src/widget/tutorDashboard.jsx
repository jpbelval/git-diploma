import React from "react";
import styles from './styles.module.css';
import { course } from "./data";
import { Link } from "react-router-dom";


const TutorDashboard = () =>{
    const pastCourse = course.filter(course => course.end < Date.now());
    const currentCourse = course.filter(course => course.start < Date.now() && course.end > Date.now());
    const futureCourse = course.filter(course => course.start > Date.now()).sort(course => course.start);

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
        <div className={styles.divContent}>
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
            </div>
        </div>
        </>
    );
};

export default TutorDashboard;