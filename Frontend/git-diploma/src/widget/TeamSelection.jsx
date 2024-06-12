import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axiosConfig';
import styles from './styles.module.css';

const TeamSelection = () => {
  const { sigle } = useParams();
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    try {
      const response = await api.get("/api/student/getProjectsFromCourse", {
        params: { sigle }
      });
      setProjects(response.data);
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };

  const registerInProject = (id) => {
    console.log(id);
  };

  useEffect(() => {
    if (sigle) {
      getProjects();
    }
  }, [sigle]);

  const ProjectList = projects.map((project, index) => (
    <tr key={index}>
      <td>
        <button onClick={() => registerInProject(project.id_project)}>
          {project.id_project}
        </button>
      </td>
      <td>--:--:--</td>
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
              <th>Information supplémentaire</th>
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
