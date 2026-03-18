import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Card className="shadow-sm h-100 p-4 border-0">
      <Card.Body>
        <Card.Title as="h2" className="mb-4 text-dark">
          Welcome user : {currentUser?.firstName} {currentUser?.lastName}
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default Home;
