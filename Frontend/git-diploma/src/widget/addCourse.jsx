import React, { useState } from "react";
import styles from "./styles.module.css"
import { course } from "./data";


const AddCourse = () => {

    const courseNotSet = course.filter(course => course.end == null);
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [endDate, setEndDate] = useState('');
    const [tempEndDates, setTempEndDates] = useState({});
  
    const handleSelectCourse = (e) => {
      setSelectedCourseId(e.target.value);
      setEndDate(tempEndDates[e.target.value] || '');
    };
  
    const handleEndDateChange = (e) => {
      setEndDate(e.target.value);
    };
  
    const handleSubmit = () => {
      setTempEndDates({
        ...tempEndDates,
        [selectedCourseId]: endDate
      });
      console.log(`Temporary End Date set for Course ID: ${selectedCourseId}, End Date: ${endDate}`);
    };
  
    return (
      <div className={styles.divCentered}>
        <div className={styles.divCenteredBorder}>
            <h2>Course Selection</h2>
            <div className={styles.divCenteredList}>
                <div className={styles.inputGroup}>    
                    <select onChange={handleSelectCourse} value={selectedCourseId}>
                    <option value="">Select a course</option>
                    {courseNotSet.map((course) => (
                        <option key={course.courseId} value={course.courseId}>
                        {course.name}, {course.code}
                        </option>
                    ))}
                    </select>
                </div>
                <div className={styles.inputGroup}>
                <label htmlFor="endDate">End Date: </label>
                <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={handleEndDateChange}
                    disabled={!selectedCourseId}
                />
                </div>
                <button onClick={handleSubmit} disabled={!selectedCourseId || !endDate} className={styles.setEndDateButton}>
                Set End Date
                </button>
                {selectedCourseId && (
                <div>
                    <h2>Selected Course</h2>
                    <p>{courseNotSet.find(course => course.courseId === parseInt(selectedCourseId))?.name}</p>
                    <p>Temporary End Date: {tempEndDates[selectedCourseId]}</p>
                </div>
                )}
            </div>
        </div>
      </div>
    );
};



export default AddCourse;