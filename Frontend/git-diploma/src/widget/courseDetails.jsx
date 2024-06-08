import React from "react";
import { course } from "./data";
import { useParams } from "react-router-dom";

const CourseDetails = () => {
    let c = useParams();
    let cId = parseInt(c.courseId);
    const cours = course.filter(course => course.courseId == cId);

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