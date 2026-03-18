import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppSidebar from '../../components/AppSidebar/AppSidebar';
import AppNavbar from '../../components/AppNavbar/AppNavbar';
import Home from '../Home/Home';
import ProductList from '../Product/ProductList';
import ProductForm from '../Product/ProductForm';
import ProductDetail from '../Product/ProductDetail';
import { Container } from 'react-bootstrap';

const Main = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  return (
    <div className="d-flex vh-100 bg-light">
      <AppSidebar />

      <div className="flex-grow-1 d-flex flex-column overflow-hidden">
        <AppNavbar />

        <Container fluid className="flex-grow-1 overflow-auto p-4">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/add" element={<ProductForm />} />
            <Route path="/products/edit/:id" element={<ProductForm />} />
            <Route path="/products/:id" element={<ProductDetail />} />
          </Routes>
        </Container>
      </div>
    </div>
  );
};

export default Main;
