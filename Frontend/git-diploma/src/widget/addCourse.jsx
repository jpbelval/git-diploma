import React, { useState } from "react";
import styles from "./styles.module.css"
import api from '../api/axiosConfig';
import { Link } from "react-router-dom";
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
  
  const handleTeamSizeChange = (e) => {
    setTeamSize(e.target.value);
  };

  const handleEndDateChange = (e) => {
      setEndDate(e.target.value);
  };
      
  const handleSubmit = () => {
    console.log(selectedCourseId);
    createTeams();
  }
      
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
      window.location.href = '/'
    } catch (error) {
      console.error("failed :", error);
    }
  };

  const handleCourseNotSet = async () => {
    try {
      const response = await api.get("/api/tutor/getCoursesWithNoTeamsFromTutor", {
        headers: {'Authorization': 'Bearer ' + keycloak.token},
        params: { cip: keycloak.tokenParsed.preferred_username }
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
          <h2>configuration de cours</h2>
          <div className={styles.divCenteredList}>
              <div className={styles.inputGroup}>    
                  <select onChange={handleSelectCourse} value={selectedCourseId}>
                  <option value="">sélectionnez un cours</option>
                  {courseNotSet.map((course) => (
                      <option key={course.sigle} value={course.sigle}>
                      {course.name}, {course.sigle}
                      </option>
                  ))}
                  </select>
              </div>
              <div className={styles.inputGroup}>
              <label htmlFor="end_Date">date de fin: </label>
              <input
                  type="date"
                  id="end_Date"
                  value={end_Date}
                  onChange={handleEndDateChange}
                  disabled={!selectedCourseId}
              />
              </div>
              <div className={styles.inputGroup}>
                  <label htmlFor="team_Size">taille des équipes: </label>
                <input
                    type="number"
                    min="1"
                    id="team_Size"
                    value={team_Size}
                    onChange={handleTeamSizeChange}
                    disabled={!selectedCourseId}
                />
              </div>
              <Link to="/tutorDashboard">
                <button onClick={handleSubmit} disabled={!selectedCourseId || !end_Date} className={styles.setEndDateButton}>
                créer les équipes
                </button>
              </Link>
          </div>
      </div>
    </div>
  );
};



export default AddCourse;