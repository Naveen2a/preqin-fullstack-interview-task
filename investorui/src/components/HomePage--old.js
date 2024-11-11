import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/investors')
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Investors details</h1>
      <table border="0" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Date Added</th>
            <th>Country</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.Name}>
              <td>{user.Name}</td>
              <td>{user.Type}</td>
              <td>{user.DateAdded}</td>
              <td>{user.Country}</td>
              <td>{user.Amount}</td>
              <td>
                {/* Link to Details Page */}
                <Link to={`/api/investors/${user.Name}`}>View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
