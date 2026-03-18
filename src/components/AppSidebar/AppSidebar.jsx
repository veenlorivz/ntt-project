import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/userActions';
import { Nav, Button } from 'react-bootstrap';

const AppSidebar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="bg-dark text-white d-flex flex-column vh-100" style={{ width: '250px' }}>
      <div className="p-3 text-center fw-bold fs-5 border-bottom border-secondary">
        NTT
      </div>
      <div className="flex-grow-1 overflow-auto mt-3">
        <Nav className="flex-column px-2" variant="pills">
          <Nav.Item>
            <Nav.Link 
              as={NavLink} 
              to="/home" 
              className={({isActive}) => `text-white ${isActive ? 'active' : ''}`}
            >
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              as={NavLink} 
              to="/products"
              className={({isActive}) => `text-white ${isActive ? 'active' : ''}`}
            >
              Product
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <div className="p-3 border-top border-secondary">
        <Button 
          variant="danger"
          onClick={handleLogout}
          className="w-100"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AppSidebar;
