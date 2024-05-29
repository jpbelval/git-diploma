import React from "react";
import styles from './studentDashboard.module.css';

const StudentDashboard = () => {
    const projet = [{
        id: 0,
        name: 'Test',
        cour: 'S2-APP2',
        remise: new Date('2024-05-01')
    },{
        id: 1,
        name: 'Test 2',
        cour: 'Projet',
        remise: new Date('2024-06-01')
    },{
        id: 2,
        name: 'Test 3',
        cour: 'S2-APP3',
        remise: new Date('2024-06-15')
    },{
        id: 3,
        name: 'Test 4',
        cour: 'S2-APP4',
        remise: new Date('2024-06-29')
    }];

    const openProjet = projet.filter(projet => projet.remise > Date.now());
    const closedProjet = projet.filter(projet => projet.remise < Date.now());
    const upcomingP = projet.filter(projet => projet.remise > Date.now()).sort(projet => projet.remise).reverse();

    const listeProjet = openProjet.map(openProjet =>
        <tr>
            <td>{openProjet.name}</td>
            <td>{openProjet.cour}</td>
            <td>--:--:--</td>
        </tr>
    );
    const ancienProjet = closedProjet.map(closedProjet =>
        <tr>
            <td>{closedProjet.name}</td>
            <td>{closedProjet.cour}</td>
            <td>--:--:--</td>
        </tr>
    );

    const upcoming = upcomingP.map(upcomingP =>
        <li>
            <p>{upcomingP.name}</p>
            <p>{upcomingP.remise.toLocaleDateString("en-US")}</p>
        </li>
    )

    return (
        <>
        <div className={styles.divContent}>

            <div className={styles.divListe}>
                <div>
                    <h2>projets</h2>
                    <div>
                        <table className={styles.tableProjet}>
                            <tr>
                                <th>nom</th>
                                <th>cours</th>
                                <th>last commit</th>
                            </tr>
                            {listeProjet}
                        </table>
                    </div>
                </div>
                <div>
                    <h2>anciens projets</h2>
                    <div>
                        <table className={styles.tableProjet}>
                            <tr>
                                <th>nom</th>
                                <th>cours</th>
                                <th>last commit</th>
                            </tr>
                            {ancienProjet}
                        </table>
                    </div>
                </div>
            </div>
            <div className={styles.divUpcoming}>
                <h2 className={styles.h2Upcoming}>remise à venir</h2>
                <ul>
                    {upcoming}
                </ul>
            </div>
        </div>
        </>
    );
};

export default StudentDashboard;