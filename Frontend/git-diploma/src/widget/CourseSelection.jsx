import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import styles from './styles.module.css';
import { useKeycloak } from '@react-keycloak/web'

const CourseSelection = () => {
  const [courses, setCourses] = useState([]);
  const { keycloak } = useKeycloak()

  const getCourses = async () => {
    try {
      const response = await api.get("/api/student/getCourses", {
        params: {
          cip: keycloak.tokenParsed.preferred_username
        }
      });
      console.log(response);
      setCourses(response.data);
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const courseList = courses.map((course, index) => (
    <tr key={index}>
      <td><Link to={`/student/teamBody/${course.sigle}`} className={styles.courseLink}>{course.sigle}</Link></td>
      <td>--:--:--</td>
    </tr>
  ));

  return (
    <div className={styles.divContent}>
      <div className={styles.divListe}>
        <div>
          <h2>Cours</h2>
          <div>
            <table className={styles.tableProjet}>
              <thead>
                <tr>
                  <th>Sigle</th>
                  <th>Informations supplementaires</th>
                </tr>
              </thead>
              <tbody>
                {courseList}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSelection;
