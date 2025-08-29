export interface receiptInterface {
    receipt_no: string;
    customer_name: string;
    service_rendered: string;
    amount_in_words: string;
    amount_in_figures: number;
    payment_method: paymentMethod;
    payment_type: paymentType;
    date: Date;
}

type paymentMethod = "cash" | "check" | "momo" | "other";

type paymentType = "full payment" | "deposit";