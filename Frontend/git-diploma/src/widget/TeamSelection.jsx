import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axiosConfig';
import styles from './styles.module.css';

const TeamSelection = () => {
  const { sigle } = useParams();
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    try {
      const response = await api.get("/api/project/getProjectsFromCourse", {
        params: { sigle }
      });
      console.log(response);
      setProjects(response.data);
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };

  const registerInProject = async (id) => {
    try {
      const response = await api.get("/api/project/setTeamMember", {
        params: { cip: 'aubm1811', project_id: id }
      });
      console.log(response);
      
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };

  useEffect(() => {
    if (sigle) {
      getProjects();
    }
  }, [sigle]);

  const ProjectList = projects.map((project, index) => (
    <tr key={index}>
      <td><input type='radio' onClick={() => registerInProject(project.id_project)}/>{project.id_project}</td>
      <td>{project.students.map(student => (<p>{student.firstname} {student.lastname},</p>))}</td>
    </tr>
  ));

  return (
    <div className={styles.divContent}>
      <div className={styles.divListe}>
        <h2>Choix d'équipe pour le cours: {sigle}</h2>
        <table className={styles.tableProjet}>
          <thead>
            <tr>
              <th>Numéro d'équipe</th>
              <th>Membres de l'équipe</th>
            </tr>
          </thead>
          <tbody>
            {ProjectList}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamSelection;
