import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import TeamSelection from './TeamSelection';
import TeamDetails from './TeamDetails';
import { useKeycloak } from '@react-keycloak/web'

const TeamBody = () => {
    const { keycloak } = useKeycloak()
    const { sigle } = useParams();
    const [inTeam, setInTeam] = useState([]);

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
        {inTeam ? (<TeamDetails sigle={sigle}/>) : (<TeamSelection sigle={sigle}/>)}
        </>
    )
};

export default TeamBody;