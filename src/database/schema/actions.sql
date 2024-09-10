-- add book
INSERT INTO Books (title, author_id, genre, publish_date, isbn, available_copies)
VALUES ('New Book Title', 1, 'Genre', '2024-01-01', '123-4567890123', 10);


-- update book

UPDATE Books
SET title = 'Updated Book Title', genre = 'Updated Genre', available_copies = 15
WHERE book_id = 1;


-- delete book
DELETE FROM Books
WHERE book_id = 1;

-- add author
INSERT INTO Authors (first_name, last_name, birthdate, nationality)
VALUES ('New', 'Author', '1980-01-01', 'Country');

-- update author
UPDATE Authors
SET first_name = 'Updated', last_name = 'Author', birthdate = '1985-01-01', nationality = 'New Country'
WHERE author_id = 1;

-- delete author
DELETE FROM Authors
WHERE author_id = 1;

-- search books by title
SELECT * FROM Books
WHERE title ILIKE '%search_term%';

-- search books by author
SELECT Books.* FROM Books
JOIN Authors ON Books.author_id = Authors.author_id
WHERE Authors.first_name ILIKE '%search_term%' OR Authors.last_name ILIKE '%search_term%';

-- search books by genre
SELECT * FROM Books
WHERE genre ILIKE '%search_term%';


------------------ members-----------------------
-- register new member
INSERT INTO Members (first_name, last_name, email, phone, registration_date)
VALUES ('New', 'Member', 'new.member@example.com', '555-0000', '2024-09-10');

-- UPDATE Members
SET first_name = 'Updated', last_name = 'Name', email = 'updated.email@example.com', phone = '555-1111'
WHERE member_id = 1;

-- delete member
DELETE FROM Members
WHERE member_id = 1;

-- search members by name
SELECT * FROM Members
WHERE first_name ILIKE '%search_term%' OR last_name ILIKE '%search_term%';

-- search members by email
SELECT * FROM Members
WHERE email ILIKE '%search_term%';

-- search members by phone
SELECT * FROM Members
WHERE phone ILIKE '%search_term%';

----------------------transactios ---------------------------

-- Record Book Borrowings
INSERT INTO Transactions (member_id, book_id, borrow_date, due_date)
VALUES (1, 1, '2024-09-10', '2024-09-24');

-- Record Book Returns
UPDATE Transactions
SET return_date = '2024-09-15'
WHERE transaction_id = 1;


-- Record Book Fines
-- Calculate fines for overdue books
SELECT 
    t.transaction_id,
    m.first_name || ' ' || m.last_name AS member_name,
    b.title AS book_title,
    t.due_date,
    COALESCE(t.return_date, CURRENT_DATE) AS return_date,
    GREATEST(0, COALESCE(t.return_date, CURRENT_DATE) - t.due_date) * 1 AS fine_amount
FROM Transactions t
JOIN Members m ON t.member_id = m.member_id
JOIN Books b ON t.book_id = b.book_id
WHERE t.return_date IS NULL OR t.return_date > t.due_date;

-- Update Book Availability When Borrowed
UPDATE Books
SET available_copies = available_copies - 1
WHERE book_id = 1;

-- Update Book Availability When Returned;
UPDATE Books
SET available_copies = available_copies + 1
WHERE book_id = 1;



--------------- 1. generate reports -----------------------

-- 1. Books currently borrowed
SELECT 
    b.book_id,
    b.title,
    m.first_name || ' ' || m.last_name AS member_name,
    t.borrow_date,
    COALESCE(t.return_date, 'Not Returned') AS return_date,
    t.due_date
FROM Transactions t
JOIN Books b ON t.book_id = b.book_id
JOIN Members m ON t.member_id = m.member_id
WHERE t.return_date IS NULL OR t.return_date > t.due_date;

-- 2. Most Popular Books

SELECT 
    b.book_id,
    b.title,
    COUNT(t.transaction_id) AS borrow_count
FROM Transactions t
JOIN Books b ON t.book_id = b.book_id
GROUP BY b.book_id, b.title
ORDER BY borrow_count DESC;


-- 3. Members with overdue books
SELECT 
    m.member_id,
    m.first_name || ' ' || m.last_name AS member_name,
    b.title AS book_title,
    t.borrow_date,
    t.due_date,
    COALESCE(t.return_date, CURRENT_DATE) AS return_date,
    GREATEST(0, COALESCE(t.return_date, CURRENT_DATE) - t.due_date) AS overdue_days
FROM Transactions t
JOIN Members m ON t.member_id = m.member_id
JOIN Books b ON t.book_id = b.book_id
WHERE t.return_date IS NULL OR t.return_date > t.due_date
ORDER BY m.member_id, t.due_date;
