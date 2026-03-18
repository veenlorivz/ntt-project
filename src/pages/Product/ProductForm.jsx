import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addProduct, editProduct, fetchProducts } from '../../redux/actions/productActions';
import AppInput from '../../components/AppInput/AppInput';
import AppButton from '../../components/AppButton/AppButton';
import { Card, Form, Alert } from 'react-bootstrap';

const ProductForm = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, items } = useSelector((state) => state.product);

  const detail = items.find((item) => item.id.toString() === id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: ''
  });

  useEffect(() => {
    if (isEditMode) {
      if (detail) {
        setFormData({
          title: detail.title,
          description: detail.description,
          price: detail.price,
          category: detail.category
        });
      } else if (!items || items.length === 0) {
        dispatch(fetchProducts(''));
      }
    }
  }, [isEditMode, detail, items, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      dispatch(editProduct({ id, data: formData }))
        .then(() => navigate('/products'))
        .catch(() => {});
    } else {
      dispatch(addProduct(formData))
        .then(() => navigate('/products'))
        .catch(() => {});
    }
  };

  return (
    <Card className="shadow-sm mx-auto p-4 border-0" style={{ maxWidth: '600px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 text-dark">
          {isEditMode ? 'Edit Product' : 'Add New Product'}
        </h2>
        <AppButton text="Back" variant="secondary" onClick={() => navigate('/products')} />
      </div>

      {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <AppInput
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <AppInput
          label="Description"
          name="description"
          as="textarea"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          required
        />
        <AppInput
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <AppInput
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <div className="mt-4">
          <AppButton
            type="submit"
            text={loading ? 'Saving...' : 'Save Product'}
            variant="primary"
            disabled={loading}
            className="w-100"
          />
        </div>
      </Form>
    </Card>
  );
};

export default ProductForm;
