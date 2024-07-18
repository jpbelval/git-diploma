import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import StudentDashboard from './studentDashboard.jsx';
import TutorDashboard from './tutorDashboard.jsx';
import { useKeycloak } from '@react-keycloak/web';
import { hasStudentRole } from '../../keycloak.js';
import { useCallback } from 'react'

const DashboardBody = () => {
    const { keycloak } = useKeycloak()

    const login = useCallback(() => {
      keycloak?.login()
    }, [keycloak])

    if(!keycloak?.authenticated)
        login();
    return(
        <>
        {hasStudentRole(keycloak.realmAccess.roles) ? (<StudentDashboard />) : (<TutorDashboard />)}
        </>
    )
};

export default DashboardBody;