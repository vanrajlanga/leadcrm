import React, { useState } from 'react';
import axios from 'axios';
import './AddQuotation.css';

const AddQuotation = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    productName: '',
    productPrice: 0,
    shipping: 0,
    tax: 0,
    sellingPrice: 0,
    productDescription: '',
    discount: 0,
    voucherCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseInt(value) });
    setSellingPrice();
};

const setSellingPrice = () => {
    let sellPrice = (formData.productPrice + formData.shipping + formData.tax) - formData.discount;

    setFormData((prevState) => ({ ...prevState, sellingPrice: parseInt(sellPrice) || 0,}));
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/quotations', formData);
      alert('Quotation added successfully!');
      setFormData({ productName: '', sellingPrice: 0, productDescription: '', productPrice: 0, shipping: 0, tax: 0, discount: 0, voucherCode: '' });
    } catch (error) {
      alert('Error adding quotation!');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>Add Quotations</h3>
          <button className="close-button" onClick={() => closeModal(false) }>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className='form-group-container'>
                <div className="form-group product-name">
                <label>Product Name</label>
                <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    required
                />
                </div>
                <div className="form-group selling-price">
                <label>S.P</label>
                <input
                    type="number"
                    name="sellingPrice"
                    value={formData.sellingPrice}
                    onChange={handleChange}
                    placeholder=""
                    required
                    readOnly
                />
                </div>
            </div>

            <div className='form-group-container'>
                <div className="form-group product-price">
                <label>Product Price</label>
                <input
                    type="number"
                    name="productPrice"
                    value={formData.productPrice}
                    onChange={handleChange}
                    placeholder="Enter product price"
                    required
                />
                </div>
                <div className="form-group shipping">
                <label>Shipping</label>
                <input
                    type="number"
                    name="shipping"
                    value={formData.shipping}
                    onChange={handleChange}
                    placeholder="Enter shipping"
                    required
                />
                </div>
                <div className="form-group tax">
                <label>Tax</label>
                <input
                    type="number"
                    name="tax"
                    value={formData.tax}
                    onChange={handleChange}
                    placeholder="Enter tax"
                    required
                />
                </div>
            </div>

            <div className='form-group-container'>
                <div className="form-group discount">
                <label>Discount</label>
                <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    placeholder="Enter discount amount"
                    required
                />
                </div>
                <div className="form-group voucher-code">
                <label>Voucher code</label>
                <input
                    type="text"
                    name="voucherCode"
                    value={formData.voucherCode}
                    onChange={handleChange}
                    placeholder="Enter voucher code"
                    required
                />
                </div>
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                required
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="submit" className="send-button">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuotation;
