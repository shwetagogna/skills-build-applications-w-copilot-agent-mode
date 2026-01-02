import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Users API endpoint:', endpoint);
        console.log('Fetched users:', data);
        setUsers(data.results || data);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, [endpoint]);

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title as="h2" className="mb-4">Users</Card.Title>
        <Table striped bordered hover responsive>
          <thead className="table-primary">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Button variant="outline-primary" size="sm">View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="primary">Add User</Button>
      </Card.Body>
    </Card>
  );
};

export default Users;
