import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import TeamSelection from './TeamSelection';
import TeamDetails from './TeamDetails';
import TeamSetSSH from './TeamSetSSH';
import { useKeycloak } from '@react-keycloak/web'

const TeamBody = () => {
    const { keycloak } = useKeycloak()
    const { sigle } = useParams();
    const [inTeam, setInTeam] = useState([]);
    const [SSH, setSSH] = useState('');
    const [SSHData, setSSHData] = useState(true);

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
      const setSSH = async () => {
          try {
              const response = await api.get("/api/student/setSSH", {
                  headers: { 'Authorization': 'Bearer ' + keycloak.token },
                  params: { cip: keycloak.tokenParsed.preferred_username }
              });
          } catch (error) {
              console.error('Error setting data:', error);
              console.log(keycloak.token);
          }
      };

      setSSH();
  }, [keycloak]);

    if(!keycloak?.authenticated)
      window.location.href = '/';

    const isInTeam = async () => {
        try {
          const response = await api.get("/api/project/studentInTeam", {
            headers: {'Authorization': 'Bearer ' + keycloak.token},
            params: { cip: keycloak.tokenParsed.preferred_username, sigle:sigle }
          });
          console.log(response);
          setInTeam(response.data);
        } catch (err) {
          console.log("Error fetching data:", err);
        }
      };

    useEffect(() => {
        if (sigle) {
          isInTeam(sigle);
        }
    }, [sigle]);



    return(
        <>
        {SSH ? inTeam ? (<TeamDetails sigle={sigle}/>) : (<TeamSelection sigle={sigle}/>) : <TeamSetSSH/>}
        </>
    )
};

export default TeamBody;