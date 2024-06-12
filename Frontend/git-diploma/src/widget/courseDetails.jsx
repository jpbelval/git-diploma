import React from "react";
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
        <p>{cours.start.toLocaleDateString("en-US")}</p>
    )

    const projLink = coursProj.map(project => (
        <li key={project.projectId}>
            <Link to={`/project/${project.projectId}`} params>{project.name}</Link>              
        </li>
    ))

    return (
        <>
        <div>
            <h1>Course Details</h1>
            {cours ? (
                <div>
                    <h2>{courseInfo}</h2>
                    <p>Start Date: {courseStart}</p>
                    <p>End Date: {/*{cours.end.toLocaleDateString("en-US")}*/}</p>
                    <h3>Projects:</h3>
                    <ul>
                        {projLink}
                    </ul>
                </div>
            ) : (
                <p>Course not found</p>
            )}
        </div>
        </>
    );
};

export default CourseDetails;