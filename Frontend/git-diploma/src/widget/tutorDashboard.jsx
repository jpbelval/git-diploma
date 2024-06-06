import React from "react";
import styles from './styles.module.css';
import { course } from "./data";



const TutorDashboard = () =>{
    const pastCourse = course.filter(course => course.end < Date.now());
    const currentCourse = course.filter(course => course.start < Date.now() && course.end > Date.now());
    const futureCourse = course.filter(course => course.start > Date.now()).sort(course => course.start).reverse();

    const pastCourseList = pastCourse.map(pastCourse =>
        <tr>
            <td>{pastCourse.name}</td>
            <td>{pastCourse.code}</td>
            <td>--:--:--</td>
        </tr>
    );

    const currentCourseList = currentCourse.map(currentCourse =>
        <tr>
            <td><Link to={`/project/${currentCourse.courseId}`} params>{currentCourse.name}</Link></td>
            <td>{currentCourse.code}</td>
            <td>--:--:--</td>
        </tr>
    );

    const futureCourseList = futureCourse.map(futureCourse =>
        <li>
            <p>{futureCourse.name}</p>
            <p>{futureCourse.start.toLocaleDateString("en-US")}</p>
        </li>
    );

    return(
        <>
            <div>
                
            </div>
        </>
    );
};

export default TutorDashboard;