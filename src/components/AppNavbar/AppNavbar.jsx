import { useSelector } from 'react-redux';
import { Navbar, Container } from 'react-bootstrap';

const AppNavbar = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Navbar bg="white" className="shadow-sm px-4 py-3 border-bottom">
      <Container fluid className="px-0">
        <Navbar.Brand className="h4 text-dark mb-0 fw-bold">NTT</Navbar.Brand>
        <div className="d-flex align-items-center gap-3">
          <Navbar.Text className="text-secondary fw-medium">
            {currentUser.firstName} {currentUser.lastName}
          </Navbar.Text>
        </div>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
