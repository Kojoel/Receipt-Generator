import { useState } from 'react';
import '../styles/createReceipt.css'
import type { receiptInterface } from '../interfaces/reciept-interface';
import { useNavigate } from 'react-router-dom';

const CreateReceipt = () => {
  const navigate = useNavigate();

  const [receiptForm, setReceiptForm] = useState<receiptInterface>({
    receipt_no: "",
    customer_name: "",
    service_rendered: "",
    amount_in_words: "",
    amount_in_figures: 0,
    payment_method: "cash",
    payment_type: "deposit",
    date: new Date(),
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!receiptForm.receipt_no.trim()) {
      newErrors.receipt_no = "Receipt number is required";
    }
    if (!receiptForm.customer_name.trim()) {
      newErrors.customer_name = "Customer name is required";
    }
    if (!receiptForm.service_rendered.trim()) {
      newErrors.service_rendered = "Service rendered is required";
    }
    if (!receiptForm.amount_in_words.trim()) {
      newErrors.amount_in_words = "Amount in words is required";
    }
    if (receiptForm.amount_in_figures <= 0) {
      newErrors.amount_in_figures = "Amount must be greater than 0";
    }
    if (!receiptForm.date || isNaN(receiptForm.date.getTime())) {
      newErrors.date = "Valid date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // true if no errors
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      localStorage.setItem("receiptForm", JSON.stringify(receiptForm))
      navigate('/showreceipt');
    } else {
      console.error("form has errors");
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target; 
    setReceiptForm((prev) => ({
      ...prev,
      [name]:
        name === "amount_in_figures"
          ? Number(value)                 
          : name === "date"
          ? new Date(value)               
          : value,                        
    }));
  };

  return (
    <div className="create-receipt-container">
      <span className="title">RECEIPT FORM</span>
      <form onSubmit={handleSubmit}>
        
        <label>Receipt No.</label>
        <input 
          type="text" 
          name="receipt_no"
          className="receipt-no" 
          onChange={handleOnChange}
          value={receiptForm.receipt_no}
        />
        {errors.receipt_no && <p className="error">{errors.receipt_no}</p>}

        <label>Customer Name</label>
        <input 
          type="text" 
          name="customer_name"
          className="customer-name"
          onChange={handleOnChange}
          value={receiptForm.customer_name}
        />
        {errors.customer_name && <p className="error">{errors.customer_name}</p>}

        <label>Service Rendered</label>
        <input 
          type="text" 
          name="service_rendered"
          className="service-rendered" 
          onChange={handleOnChange}
          value={receiptForm.service_rendered}
        />
        {errors.service_rendered && <p className="error">{errors.service_rendered}</p>}

        <label>Amount in words</label>
        <input 
          type="text" 
          name="amount_in_words"
          className="amount-in-words" 
          onChange={handleOnChange}
          value={receiptForm.amount_in_words}
        />
        {errors.amount_in_words && <p className="error">{errors.amount_in_words}</p>}

        <label>Amount in Figures</label>
        <input 
          type="number" 
          name="amount_in_figures"
          className="amount-in-figures" 
          onChange={handleOnChange}
          value={receiptForm.amount_in_figures.toString()}
        />
        {errors.amount_in_figures && <p className="error">{errors.amount_in_figures}</p>}

        <label>Payment Method</label>
        <select 
          name="payment_method"
          onChange={handleOnChange}
          value={receiptForm.payment_method}
        >
          <option value="cash">Cash</option>
          <option value="check">Check</option>
          <option value="momo">Momo</option>
          <option value="other">Other</option>
        </select>

        <label>Payment Type</label>
        <select 
          name="payment_type"
          onChange={handleOnChange}
          value={receiptForm.payment_type}
        >
          <option value="full payment">Full Payment</option>
          <option value="deposit">Deposit</option>
        </select>

        <label>Date</label>
        <input 
          type="date" 
          name="date" 
          onChange={handleOnChange}
          value={receiptForm.date.toISOString().split("T")[0]}
        />
        {errors.date && <p className="error">{errors.date}</p>}

        <button type="submit" className="submit">Generate Receipt</button>
      </form>
    </div>
  )
}

export default CreateReceipt;
