import React, { useState } from 'react';
import axios from 'axios';
import './AddQuotation.css';

const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

const AddQuotation = ({ closeModal, lead }) => {
  const [formData, setFormData] = useState({
    product_name: lead.parts,
    product_price: 0,
    shipping: 0,
    tax: 0,
    selling_price: 0,
    quote_details: "",
    discount: 0,
    voucher: "",
    lead_id: lead?.id,
    agent_id: lead?.agent_id,
    to_number: lead?.phone
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      if(name != "product_name" && name != "voucher" && name != "quote_details"){
        const updatedFormData = { ...prevState, [name]: parseInt(value) };
        setSellingPrice(updatedFormData);
        return updatedFormData;
      }else{
        const updatedFormData = { ...prevState, [name]: value };
        return updatedFormData;
      }
    });
};

const setSellingPrice = (updatedFormData) => {
  let sellPrice = (updatedFormData.product_price + updatedFormData.shipping + updatedFormData.tax) - updatedFormData.discount;
  setFormData((prevState) => ({ ...prevState, selling_price: parseInt(sellPrice) || 0,}));
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/create-quotations`, formData, { headers: { Authorization: `Bearer ${token}` } });
      alert('Quotation added successfully!');
      setFormData({ selling_price: 0, quote_details: "", product_price: 0, shipping: 0, tax: 0, discount: 0, voucher: "" });
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
                    name="product_name"
                    value={formData.product_name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    required
                    readOnly
                />
                </div>
                <div className="form-group selling-price">
                <label>S.P</label>
                <input
                    type="number"
                    name="selling_price"
                    value={formData.selling_price}
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
                    name="product_price"
                    value={formData.product_price}
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
                    name="voucher"
                    value={formData.voucher}
                    onChange={handleChange}
                    placeholder="Enter voucher code"
                />
                </div>
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="quote_details"
                value={formData.quote_details}
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
