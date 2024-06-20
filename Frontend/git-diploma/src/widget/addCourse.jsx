import React from "react";
import styles from "./styles.module.css"
import { course } from "./data";

const AddCourse = () => {

    const courseNotSet = course.filter(course => course.end == null);

    const courseNotSetList = courseNotSet.map(courseNotSet =>
        <p>
            {courseNotSet.name}, {courseNotSet.code}
        </p>
    );

    return (
        <>
        <div>
            <h2>Course not set</h2>
            <div>
                {courseNotSetList}
            </div>
            <button className={styles.buttonForm}>dagm</button>
        </div>
        </>
    );
};

//test

export default AddCourse;