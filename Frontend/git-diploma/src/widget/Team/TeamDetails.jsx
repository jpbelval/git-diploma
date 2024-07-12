import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import api from '../../api/axiosConfig';

function TeamDetails() {
    const { keycloak } = useKeycloak();
    const { sigle } = useParams();
    const [SSH, setSSH] = useState('');
    const [SSHData, setSSHData] = useState(true);

     const login = useCallback(() => {
         keycloak?.login();
     }, [keycloak]);

     useEffect(() => {
         const fetchSSH = async () => {
             try {
                 const response = await api.get("/api/student/getSSH", {
                     headers: { 'Authorization': 'Bearer ' + keycloak.token },
                     params: { cip: keycloak.tokenParsed.preferred_username }
                 });

                 setSSH(response.data);

                 setSSHData(false);
                 if (response.data) {
                     setSSHData(true);
                 }
             } catch (error) {
                 console.error('Error fetching data:', error);
                 console.log(keycloak.token);
             }
         };

         fetchSSH();
     }, [keycloak]);

    useEffect(() => {
        if (!keycloak?.authenticated) {
            login();
        }
    }, [keycloak, login]);

    return (
        <div>
            <h2>Team Details for {sigle}</h2>
            {/* Affichage des données SSH */}
            <p>{SSH}</p>
            <div>
               {SSHData ? <p>Il y a une cle SSH</p> : <p>Il n y a pas de cle SSH</p>}
            </div>
        </div>
    );
}

export default TeamDetails;