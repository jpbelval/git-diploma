import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import styles from '../styles.module.css';
import api from '../../api/axiosConfig';

function TeamDetails() {
    const { keycloak } = useKeycloak();
    const { sigle } = useParams();
    const [idProject, setIdProject] = useState('');
    const [ students, setStudents ] = useState([]);
    

     const login = useCallback(() => {
         keycloak?.login();
     }, [keycloak]);

    useEffect(() => {
        if (!keycloak?.authenticated) {
            login();
        }
    }, [keycloak, login]);

    const UserList = students.map((student, index) => (
        <tr key={index}>
          <td>{student.cip}</td>
          <td>{student.firstname}, {student.lastname}</td>
        </tr>
      ));

    useEffect(() => {
        const fetchSSH = async () => {
            try {
                const response1 = await api.get("/api/student/getProjectFromStudentCourse", {
                    headers: { 'Authorization': 'Bearer ' + keycloak.token },
                    params: { cip: keycloak.tokenParsed.preferred_username, sigle: sigle }
                  });
              
                  // Set the project ID
                  const idProject = response1.data;
                  setIdProject(idProject);
              
                  // Second API call, after the first one is completed
                  const response2 = await api.get("/api/student/getStudents", {
                    headers: { 'Authorization': 'Bearer ' + keycloak.token },
                    params: { id_project: idProject }
                  });
                setStudents(response2.data)
                console.log(response2.data)

            } catch (error) {
                console.error('Error fetching data:', error);
                console.log(keycloak.token);
            }
        };

        fetchSSH();
    }, [keycloak]);

    return (
        <>
        <div className={styles.divContent}>
            <h2>détail d'équipe : {idProject}</h2>
        </div>
        <div className={styles.divContent}>
            {UserList}
        </div>
        </>
    );
}

export default TeamDetails;