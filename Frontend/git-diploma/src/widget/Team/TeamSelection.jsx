import React, { useState, useEffect } from 'react';
import { redirect } from 'react-router-dom';
import api from '../../api/axiosConfig';
import styles from '../styles.module.css';
import { useKeycloak } from '@react-keycloak/web'

function TeamSelection({sigle}) {
  const { keycloak } = useKeycloak()
  const [projects, setProjects] = useState([]);
  const [id_project, setIdProject] = useState(-1);

  const onValueChange = async (project_id) => {
      setIdProject(project_id);
    };

  const getProjects = async () => {
    try {
      const response = await api.get("/api/team/getProjects", {
        headers: {'Authorization': 'Bearer ' + keycloak.token},
        params: { sigle }
      });
      console.log(response);
      setProjects(response.data);
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };

  const registerInProject = async () => {
    try {
      const response = await api.get("/api/team/registerInProject", {
        headers: {'Authorization': 'Bearer ' + keycloak.token},
        params: { sigle: sigle, id_project: id_project, cip: keycloak.tokenParsed.preferred_username }
      });
      console.log(response);
      window.location.href = '/student/teamBody/' + sigle;
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
      <td>{project.max_member > project.students.length? <input type='radio' name="projectSelection" onClick={() => onValueChange(project.id_project)} /> : ""} {project.id_project}</td>
      <td>{project.students.map(student => (<p>{student.firstname} {student.lastname},</p>))}</td>
    </tr>
  ));

  return (
    <>
    { projects.length > 0 ? 
    <div className={styles.divContent}>
    <div className={styles.divListe}>
      <h2>choix d'équipe pour le cours: {sigle}</h2>
      <table className={styles.tableProjet}>
        <thead>
          <tr>
            <th>numéro d'équipe</th>
            <th>membres de l'équipe</th>
          </tr>
        </thead>
        <tbody>
          {ProjectList}
        </tbody>
      </table>
      <>
        <button style={id_project === -1 ? {backgroundColor:"gray", color:"white"} : {backgroundColor:"#018849"}} disabled={id_project === -1 ? true : false} onClick={registerInProject}> confirmer </button>
      </>
    </div>
  </div> :
   <div className={styles.divContent}>
   <div className={styles.divListe}>
     <h2>choix d'équipe pour le cours {sigle} fermé</h2>
     <p>si vous pensez qu'il s'agit d'une erreur, veuillez contacter votre tuteur</p>
   </div>
 </div>}
  </>
    
  );
};

export default TeamSelection;