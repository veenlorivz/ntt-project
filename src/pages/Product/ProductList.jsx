import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProducts, deleteProduct } from '../../redux/actions/productActions';
import AppButton from '../../components/AppButton/AppButton';
import AppInput from '../../components/AppInput/AppInput';
import { Card, Table, Form, Alert, Spinner, ButtonGroup } from 'react-bootstrap';

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector((state) => state.product);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items ? items.filter(item => 
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.category?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  useEffect(() => {
    if (!items || items?.length === 0) {
      dispatch(fetchProducts(''));
    }
  }, [dispatch]);



  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <Card className="shadow-sm p-4 border-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 text-dark">Products</h2>
        <Link to="/products/add" className="text-decoration-none">
          <AppButton text="+ Add Product" variant="primary" />
        </Link>
      </div>

      <Form onSubmit={(e) => e.preventDefault()} className="d-flex gap-2 mb-4">
        <AppInput
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="flex-grow-1 mb-0"
        />
      </Form>

      {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Table hover responsive className="align-middle">
          <thead className="table-light">
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="fw-medium text-dark">{product.title}</div>
                    </div>
                  </td>
                  <td className="text-secondary">{product.category}</td>
                  <td>${product.price}</td>
                  <td className="text-center">
                    <ButtonGroup size="sm" className="gap-2">
                      <AppButton 
                        text="View" 
                        variant="secondary" 
                        onClick={() => navigate(`/products/${product.id}`)}
                      />
                      <AppButton 
                        text="Edit" 
                        variant="primary" 
                        onClick={() => navigate(`/products/edit/${product.id}`)}
                      />
                      <AppButton 
                        text="Delete" 
                        variant="danger" 
                        onClick={() => handleDelete(product.id)}
                      />
                    </ButtonGroup>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted py-4">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Card>
  );
};

export default ProductList;
