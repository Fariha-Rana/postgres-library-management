-- Create authors table
CREATE TABLE authors (
    author_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    birth_date DATE,
    nationality VARCHAR(50)
);

-- Create categories table
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Create books table
CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    isbn VARCHAR(13) UNIQUE,
    published_date DATE,
    category_id INTEGER REFERENCES categories(category_id),
    available_copies INTEGER NOT NULL DEFAULT 0
);

-- Create book_authors table (for many-to-many relationship)
CREATE TABLE book_authors (
    book_id INTEGER REFERENCES books(book_id),
    author_id INTEGER REFERENCES authors(author_id),
    PRIMARY KEY (book_id, author_id)
);

-- Create members table
CREATE TABLE members (
    member_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    join_date DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Create loans table
CREATE TABLE loans (
    loan_id SERIAL PRIMARY KEY,
    book_id INTEGER REFERENCES books(book_id),
    member_id INTEGER REFERENCES members(member_id),
    loan_date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    return_date DATE,
    CONSTRAINT check_return_date CHECK (return_date IS NULL OR return_date >= loan_date)
);

-- Create indexes for frequently queried columns
CREATE INDEX idx_books_title ON books(title);
CREATE INDEX idx_members_email ON members(email);
CREATE INDEX idx_loans_due_date ON loans(due_date);