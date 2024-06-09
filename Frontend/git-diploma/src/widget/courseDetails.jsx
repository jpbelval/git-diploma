import React from "react";
import { course, projet } from "./data";
import { useParams } from "react-router-dom";

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
                        {coursProj.map(project => (
                            <li key={project.projectId}>{project.name}</li>
                        ))}
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