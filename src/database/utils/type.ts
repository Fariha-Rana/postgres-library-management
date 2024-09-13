export interface Authors {
  author_id: number;
  first_name: string;
  last_name: string;
  birthdate: string;
  nationality: string;
}

export interface Books {
  book_id: number;
  title: string;
  genre: string;
  author_name: string;
  publish_date: string;
  isbn: number;
  available_copies: number;
  author_id: number;
}

export interface Members {
  member_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  registration_date: string;
}

export interface Transactions {
  transaction_id: number;
  book_id: number;
  borrow_date: string;
  return_date: string;
  due_date: string;
  member_id: number;
}
