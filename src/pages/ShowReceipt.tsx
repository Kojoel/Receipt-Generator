import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import '../styles/showreceipt.css';
import type { receiptInterface } from "../interfaces/reciept-interface";
import html2canvas from "html2canvas";

const ShowReceipt: React.FC = () => {
  const [receipt, setReceipt] = useState<receiptInterface | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("receiptForm");
    if (saved) {
      setReceipt(JSON.parse(saved));
    }
  }, []);


    const downloadPDF = async () => {
        const receiptElement = document.querySelector(".receipt-container") as HTMLElement;
        if (!receiptElement) return;

        const canvas = await html2canvas(receiptElement, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "pt", "a4");
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const margin = 28; // ~10mm
        const availableWidth = pageWidth - margin * 2;
        const availableHeight = pageHeight - margin * 2;

        // Scale image proportionally
        const imgWidth = availableWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // If image is too tall, scale by height instead
        let finalWidth = imgWidth;
        let finalHeight = imgHeight;

        if (imgHeight > availableHeight) {
            finalHeight = availableHeight;
            finalWidth = (canvas.width * finalHeight) / canvas.height;
        }

        // Center the image inside margins
        const x = (pageWidth - finalWidth) / 2;
        const y = (pageHeight - finalHeight) / 2;

        pdf.addImage(imgData, "PNG", x, y, finalWidth, finalHeight);
        pdf.save("receipt.pdf");
    };



    if (!receipt) return <p>No receipt data found.</p>;

  return (
    <div className="page-spacer">
        <div className="receipt-container">
            <div className="container">
                <img className="harp-chorale-logo" src="../../assets/images/harp-coral.png" alt="logo" />
                <div className="receipt-no-wrapper-2">
                    <span className="receipt-text">RECEIPT</span>
                    <div className="receipt-no-inner">
                        <span>Receipt No.</span>
                        <span>{receipt.receipt_no}</span>
                    </div>
                </div>
                <div className="contact-details">
                    <div className="date">
                        <span>Date</span>
                        <span>{new Date(receipt.date).toLocaleDateString()}</span>
                    </div>
                    <div className="email">
                        <span>Email</span>
                        <span>harpchorale@gmail.com</span>
                    </div>
                    <div className="mobile">
                        <span>Mobile</span>
                        <span>0534978887 / 0243714380</span>
                    </div>
                    <div className="location">
                        <span>Location</span>
                        <span>Accra, Korle Gonno</span>
                    </div>
                </div>
            </div>
            <div className="orange-bar"></div>
            <div className="content">
                <div className="from">
                    <span>Received from</span>
                    <span>{receipt.customer_name}</span>
                </div>
                <div className="amount-in-words">
                    <span>Amount in words</span>
                    <span>{receipt.amount_in_words}</span>
                </div>
                <div className="service-rendered">
                    <span>Service Rendered</span>
                    <span>{receipt.service_rendered}</span>
                </div>
                <div className="last-line">
                    <span>Payment Method</span>
                    <span className="underline">{receipt.payment_method}</span>

                    <span>Payment Type</span>
                    <span className="underline">{receipt.payment_type}</span>

                    <span>Amount (GHS)</span>
                    <span className="underline">{receipt.amount_in_figures}</span>
                </div>
            </div>

        </div>
        <div className="button-wrapper">
            <button
                onClick={downloadPDF}
            >
                Download as PDF
            </button>
        </div>
    </div>  
  );
};

export default ShowReceipt;
