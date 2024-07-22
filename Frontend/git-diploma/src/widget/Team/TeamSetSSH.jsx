import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import styles from '../styles.module.css';
import api from '../../api/axiosConfig';

function TeamSetSSH() {
    const { keycloak } = useKeycloak();
    const { sigle } = useParams();
    const [SSH, setSSH] = useState('');
    const [SSHkey, setSSHkey] = useState('');
    const [SSHData, setSSHData] = useState(true);

     const login = useCallback(() => {
         keycloak?.login();
     }, [keycloak]);


    useEffect(() => {
        if (!keycloak?.authenticated) {
            login();
        }
    }, [keycloak, login]);

    const submitSSH  = async () => {
        console.log(SSHkey)
        try {
            console.log("etest")
            const response = await api.get("/api/student/setSSH", {
                headers: { 'Authorization': 'Bearer ' + keycloak.token },
                params: { cip: keycloak.tokenParsed.preferred_username, sshKey: SSHkey }
            });
        } catch (error) {
            console.error('Error setting data:', error);
            console.log(keycloak.token);
        }
        window.location.href = '/equipe'
    }

    const updateSSH = async (e) => {
        console.log(e.target.value)
        setSSHkey(e.target.value);
    }

    return (
        <div className={styles.divContent}>
      <div className={styles.divListe}>
        <h2>Veuillez ajouter votre clée SSH</h2>
        <label>
            <textarea id='SSHkey' onChange={updateSSH}></   textarea>
        </label>
        <div style={{marginTop: 15}}>
            <button onClick={submitSSH}> Confirmer </button>
        </div>
      </div>
    </div>
    );
}

export default TeamSetSSH;