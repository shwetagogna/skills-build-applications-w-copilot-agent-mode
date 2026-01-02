import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Leaderboard API endpoint:', endpoint);
        console.log('Fetched leaderboard:', data);
        setLeaders(data.results || data);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, [endpoint]);

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title as="h2" className="mb-4">Leaderboard</Card.Title>
        <Table striped bordered hover responsive>
          <thead className="table-primary">
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((leader, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{leader.name}</td>
                <td>{leader.points}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default Leaderboard;
