import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../../redux/actions/productActions';
import AppButton from '../../components/AppButton/AppButton';
import { Card, Row, Col, Badge, Spinner, Alert } from 'react-bootstrap';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector((state) => state.product);
  
  const detail = items.find((item) => item.id.toString() === id);

  useEffect(() => {
    if (!items || items.length === 0) {
      dispatch(fetchProducts(''));
    }
  }, [dispatch, items]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger" className="mt-4">{error}</Alert>;
  }

  if (!detail) return null;

  return (
    <Card className="shadow-sm mx-auto p-4 border-0" style={{ maxWidth: '800px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 text-dark">{detail.title}</h2>
        <AppButton text="Back to List" variant="secondary" onClick={() => navigate('/products')} />
      </div>
      
      <Row className="g-4">
        <Col md={12} className="d-flex flex-column gap-3">
          <p className="text-secondary fs-5">{detail.description}</p>
          <div className="fs-3 fw-semibold text-primary">${detail.price}</div>
          <div className="d-flex flex-wrap gap-2">
            <Badge bg="light" text="dark" className="border p-2">
              Category: {detail.category}
            </Badge>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductDetail;
