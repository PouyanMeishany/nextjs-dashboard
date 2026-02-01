// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.

import { JSX } from "react/jsx-runtime";

// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
};


export type Quote = {
  id: string;
  name: string;
  email: string;
  help_with: string;
  pdf_generated: boolean;
  email_sent: boolean;
  address: string;
  city: string;
  phone: string;
  status: 'pending' | 'completed';
}

export type Reviews = {
  id: string;
  name: string;
  city: string;
  review_text: string;
  status: 'pending' | 'approved' | 'declined';
  rating: number;
}

export type QuotesTable = {
  id: string;
  name: string;
  email: string;
  help_with: string;
  pdf_generated: boolean;
  email_sent: boolean;
  address: string;
  city: string;
  created_at: string;
  phone: string;
  status: 'pending' | 'completed';
}

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type QuoteForm = {
  id: string;
  name: string;
  email: string;
  help_with: string;
  pdf_generated: boolean;
  email_sent: boolean;
  address: string;
  city: string;
  created_at: string;
  phone: string;
  status: 'pending' | 'completed';
}

export type QuotesByMonth = {
  month: string;
  count: number;
};

export type LatestQuote = {
  id: string;
  name: string;
  email: string;
  help_with: string;
  status: 'pending' | 'approved' | 'completed';
  created_at: string;
};

export type ReviewForm = {
  map(arg0: (re: any) => JSX.Element): import("react").ReactNode;
  id: string;
  name: string;
  review_text: string;
  city: string;
  rating: number;
  status: 'pending' | 'declined' | 'approved';
};
