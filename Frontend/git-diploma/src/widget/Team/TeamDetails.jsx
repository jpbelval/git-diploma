import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web'

function TeamDetails({sigle}) {
    const { keycloak } = useKeycloak();

    if(!keycloak?.authenticated)
        window.location.href = '/';

    return(
        <>
        vlavldajfka
        </>
    )
};

export default TeamDetails;