import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig';

const CourseSelection = () => {
  const [membre, setMembre] = useState([]);

  const getMembres = async () => {
    try {
      const response = await api.get("/api/student/getCourses", {
        params: {
          cip: 'lepl1501'
        }
      });
      setMembre(response.data);
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  }

  useEffect(() => {
    getMembres();
  }, []);

  const listMembre = membre.map((membre, index) => {
    console.log("Mapping member:", membre);
    return (
      <tr key={index}>
        <td><Link to={`/student/teamSelection/${membre.sigle}`}>{membre.sigle}</Link></td>
      </tr>
    );
  });

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Course Code</th>
          </tr>
        </thead>
        <tbody>
          {listMembre}
        </tbody>
      </table>
    </>
  );
}

export default CourseSelection;
