import React, { useState } from "react";
import styles from "./styles.module.css"
import api from '../api/axiosConfig';
import { useKeycloak } from '@react-keycloak/web'

const AddCourse = () => {

    const [courseNotSet, setCourseNotSet] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [end_Date, setEndDate] = useState('');
    const [team_Size, setTeamSize] = useState('');
    const [tempEndDates, setTempEndDates] = useState({});
    const { keycloak } = useKeycloak()
  
    const handleSelectCourse = (e) => {
      setSelectedCourseId(e.target.value);
      setEndDate(tempEndDates[e.target.value] || '');
    };
  
    const handleEndDateChange = (e) => {
      setEndDate(e.target.value);
    };

const createTeams = async () => {
  try {
    await api.get("/api/tutor/createTeams", {
    params: {
      teamSize: team_Size,
      endDate: end_Date,
      sigle: selectedCourseId,
    },
      headers: {
        'Authorization': 'Bearer ' + keycloak.token
      }
    });
    console.log("success");
  } catch (error) {
    console.error("failed :", error);
  }
};


   const handleTeamSizeChange = (e) => {
         setTeamSize(e.target.value);
       };

    const handleSubmit = () => {
       console.log(selectedCourseId);
       createTeams();
    };

   const handleCourseNotSet = async () => {
         try {
            const response = await api.get("/api/tutor/getCourseWithNoTeams", {
              headers: {'Authorization': 'Bearer ' + keycloak.token},
            });
            setCourseNotSet(response.data);
          } catch (err) {
            console.log("Error fetching data:", err);
          }
      }

   handleCourseNotSet();

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
                <label htmlFor="end_Date">End Date: </label>
                <input
                    type="date"
                    id="end_Date"
                    value={end_Date}
                    onChange={handleEndDateChange}
                    disabled={!selectedCourseId}
                />
                </div>
                <div className={styles.inputGroup}>
                   <label htmlFor="team_Size">Nombre Equipe: </label>
                 <input
                     type="number"
                     min="1"
                     id="team_Size"
                     value={team_Size}
                     onChange={handleTeamSizeChange}
                     disabled={!selectedCourseId}
                 />
                 </div>
                <button onClick={handleSubmit} disabled={!selectedCourseId || !end_Date} className={styles.setEndDateButton}>
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