-- TO dO
-- 1. create a search function
-- 2. give ids to books, authors, members forms

--  generate unique ids for authors
BEGIN;
SELECT next_id INTO new_id FROM ID_Manager WHERE table_name = 'Authors';
UPDATE ID_Manager SET next_id = next_id + 1 WHERE table_name = 'Authors';
COMMIT;

-- Use new_id for insertion
-- INSERT INTO Authors (author_id, first_name, last_name, birthdate, nationality)
-- VALUES (new_id, 'Margaret', 'Atwood', '1939-11-18', 'Canadian');

-- search books
CREATE OR REPLACE FUNCTION search_books(
    search_text TEXT
) RETURNS TABLE (
     book_id INT,
    title VARCHAR(255),
    author_id INT,
    genre VARCHAR(100),
    publish_date DATE,
    isbn VARCHAR(20),
    available_copies INT
) AS $$
BEGIN
    RETURN QUERY
    SELECT b.book_id, b.title, b.author_id, b.genre, b.publish_date, b.isbn, b.available_copies
    FROM Books b
    WHERE
        b.title ILIKE '%' || search_text || '%' OR
        b.isbn ILIKE '%' || search_text || '%' OR
        b.genre ILIKE '%' || search_text || '%' OR
        b.author_id IN (
            SELECT a.author_id
            FROM Authors a
            WHERE
                a.first_name ILIKE '%' || search_text || '%' OR
                a.last_name ILIKE '%' || search_text || '%' OR
            (a.first_name || ' ' || a.last_name) ILIKE '%' || search_text || '%'
        );
END;
$$ LANGUAGE plpgsql;



-- search books by author
SELECT Books.* FROM Books
JOIN Authors ON Books.author_id = Authors.author_id
WHERE Authors.first_name ILIKE '%search_term%' OR Authors.last_name ILIKE '%search_term%';

CREATE OR REPLACE FUNCTION search_authors(
    search_text TEXT
) RETURNS TABLE (
    author_id INT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    birthdate DATE,
    nationality VARCHAR(100)
) AS $$
BEGIN
    RETURN QUERY
    SELECT a.author_id, a.first_name, a.last_name, a.birthdate, a.nationality
    FROM Authors a
    WHERE
        a.first_name ILIKE '%' || search_text || '%' OR
        a.last_name ILIKE '%' || search_text || '%' OR
        a.nationality ILIKE '%' || search_text || '%' OR
        (a.first_name || ' ' || a.last_name) ILIKE '%' || search_text || '%';
END;
$$ LANGUAGE plpgsql;



------------------ members-----------------------

-- search members by name
CREATE OR REPLACE FUNCTION search_members(
    search_text TEXT
) RETURNS TABLE (
    member_id INT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(20),
    registration_date DATE
) AS $$
BEGIN
    RETURN QUERY
    SELECT m.member_id, m.first_name, m.last_name, m.email, m.phone, m.registration_date
    FROM Members m
    WHERE
        m.first_name ILIKE '%' || search_text || '%' OR
        m.last_name ILIKE '%' || search_text || '%' OR
        m.email ILIKE '%' || search_text || '%' OR
        m.phone ILIKE '%' || search_text || '%' OR
        (m.first_name || ' ' || m.last_name) ILIKE '%' || search_text || '%';
END;
$$ LANGUAGE plpgsql;



----------------------transactios ---------------------------

-- search transactions by
CREATE OR REPLACE FUNCTION search_transactions(
    search_text TEXT
) RETURNS TABLE (
    transaction_id INT,
    member_id INT,
    book_id INT,
    borrow_date DATE,
    return_date DATE,
    due_date DATE
) AS $$
BEGIN
    RETURN QUERY
    SELECT t.transaction_id, t.member_id, t.book_id, t.borrow_date, t.return_date, t.due_date
    FROM Transactions t
    WHERE
        t.member_id IN (
            SELECT m.member_id
            FROM Members m
            WHERE
                m.first_name ILIKE '%' || search_text || '%' OR
                m.last_name ILIKE '%' || search_text || '%' OR
                (m.first_name || ' ' || m.last_name) ILIKE '%' || search_text || '%'
        ) OR
        t.book_id IN (
            SELECT b.book_id
            FROM Books b
            WHERE
                b.title ILIKE '%' || search_text || '%' OR
                b.isbn ILIKE '%' || search_text || '%'
        );
END;
$$ LANGUAGE plpgsql;


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


-- Trigger function to update available copies
CREATE OR REPLACE FUNCTION update_available_copies()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE Books
        SET available_copies = available_copies - 1
        WHERE book_id = NEW.book_id;
    ELSIF TG_OP = 'UPDATE' AND OLD.return_date IS NULL AND NEW.return_date IS NOT NULL THEN
        UPDATE Books
        SET available_copies = available_copies + 1
        WHERE book_id = NEW.book_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


--no user can borrow same book twice
--CONSTRAINT unique_member_book_active UNIQUE (member_id, book_id, return_date IS NULL)


ALTER TABLE Transactions
ADD CONSTRAINT unique_member_book_active
UNIQUE (member_id, book_id, return_date IS NULL);


CREATE OR REPLACE FUNCTION check_duplicate_borrowing()
RETURNS TRIGGER AS $$
BEGIN
    -- Check for existing active transaction with the same member and book
    IF EXISTS (
        SELECT 1
        FROM Transactions
        WHERE member_id = NEW.member_id
        AND book_id = NEW.book_id
        AND return_date IS NULL
        AND transaction_id != NEW.transaction_id
    ) THEN
        RAISE EXCEPTION 'Member % is already borrowing book %', NEW.member_id, NEW.book_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trigger_check_duplicate_borrowing
BEFORE INSERT OR UPDATE ON Transactions
FOR EACH ROW
EXECUTE FUNCTION check_duplicate_borrowing();

