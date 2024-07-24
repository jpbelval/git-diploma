import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import styles from '../styles.module.css';
import api from '../../api/axiosConfig';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { VscCopy, VscCheck } from "react-icons/vsc";

function TeamDetails() {
    const { keycloak } = useKeycloak();
    const { sigle } = useParams();
    const [idProject, setIdProject] = useState('');
    const [ students, setStudents ] = useState([]);
    const [ copied, setIsCopied] = useState(false);
    const [ urlGit, setUrlGit] = useState('');
    

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
                  const idProject = response1.data["id_project"];
                  setIdProject(idProject);
                  const gitUrl = response1.data["gitUrl"];
                  setUrlGit(gitUrl);
              
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

            <div className={styles.divListe}>
                <div>       
                    <h2>numéro d'équipe : {sigle}-{idProject}</h2>
                    <div>
                        <table className={styles.tableProjet}>
                            {UserList}
                        </table>
                    </div>
                </div>
            </div>
            <div className={styles.divUpcoming}>
                <h2 className={styles.h2Upcoming} style={{marginBottom: '0'}}>clone</h2>
                <ul style={{padding: '5%', margin: '0', paddingTop: '0'}}>
                    <input value={urlGit}
                    onChange={({target: {urlGit}}) => this.setState({urlGit, copied: false})} style={{minWidth: '78%'}}/>

                    <CopyToClipboard text={urlGit}
                    onCopy={() => setIsCopied(true)}>
                    <button style={{padding: '0.5em'}}>{copied ? <span style={{color: 'green'}}><VscCheck></VscCheck></span> : <VscCopy></VscCopy>}</button>
                    </CopyToClipboard>
                </ul>
            </div>
        </div>
        </>
    );
}

export default TeamDetails;