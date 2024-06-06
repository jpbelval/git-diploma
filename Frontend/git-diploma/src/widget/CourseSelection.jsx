import { useState, useEffect } from 'react';

const [membre, setMembre] = useState();

const getMembres = async() => {
    try{
      const response = await api.get("/api/student/getCourses", {
        params:{
          cip: 'lepl1501'
        }
      });
      console.log(response.data);
      setMembre(response.data);
    }catch(err){
      console.log(err);
    }
  }

 useEffect(() =>{
   getMembres();
 }, [])

const listMembre = membre.map(membre =>
      <tr>
            <td><Link to={`/student/teamSelection/${membre.sigle}`}>{membre.sigle}</Link></td>

      </tr>
   );

/*
const listeProjet = openProjet.map(openProjet =>
        <tr>
            <td><Link to={`/project/${openProjet.projectId}`} params>{openProjet.name}</Link></td>
            <td>{openProjet.cour}</td>
            <td>--:--:--</td>
        </tr>
    );

   const getMembres = async() => {
       try{
         const response = await api.get("/api/student/getStudent", {
           params:{
             cip: 'aubm1811'
           }
         });
         console.log(response.data);
         setMembre(response.data);
       }catch(err){
         console.log(err);
       }
     }
*/

const CourseSelection = () => {
   return (
         <>

         </>
      )
   }

export default CourseSelection