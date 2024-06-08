import React from "react";
import { course } from "./data";
import { useParams } from "react-router-dom";

const CourseDetails = () => {
    const { code } = useParams();
    const cours = course.filter(course => course.code === code);

    const courseInfo = cours.map(cours => 
        <p>{cours.name}</p>
    )

    return (
        <>
        {courseInfo}
        </>
    )
};

export default CourseDetails;