import { InvoiceItem } from "./InvoiceItem";

export interface Invoice {
    id: number;
    billerName: string;
    patientName: string;
    invoiceDate: Date;
    invoiceAmount: number;
    invoiceTime: string;
    invoiceItems: InvoiceItem[];
    invoiceNumber: string;
}