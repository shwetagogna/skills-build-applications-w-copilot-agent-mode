import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Activities API endpoint:', endpoint);
        console.log('Fetched activities:', data);
        setActivities(data.results || data);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, [endpoint]);

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title as="h2" className="mb-4">Activities</Card.Title>
        <Table striped bordered hover responsive>
          <thead className="table-primary">
            <tr>
              <th>Name</th>
              <th>Duration (min)</th>
              <th>Calories</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {activities.map(activity => (
              <tr key={activity.id}>
                <td>{activity.name}</td>
                <td>{activity.duration}</td>
                <td>{activity.calories}</td>
                <td>
                  <Button variant="outline-primary" size="sm">View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="primary">Add Activity</Button>
      </Card.Body>
    </Card>
  );
};

export default Activities;
