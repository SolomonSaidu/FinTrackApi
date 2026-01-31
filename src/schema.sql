
-- Users Table
CREATE TABLE IF NOT EXISTS users (
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
password_hash TEXT NOT NULL,  -- Added
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
id SERIAL PRIMARY KEY,
name VARCHAR(50) UNIQUE NOT NULL
);

-- Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id) ON DELETE CASCADE,
amount NUMERIC NOT NULL,
type VARCHAR(10) CHECK (type IN ('income', 'expense')) NOT NULL,
category VARCHAR(50),
note TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Budgets Table
CREATE TABLE budgets (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL,
  amount NUMERIC NOT NULL,
  month INTEGER CHECK (month BETWEEN 1 AND 12),
  year INTEGER NOT NULL,
  UNIQUE (user_id, category, month, year)
);

-- Add password_hash to user table: added to the user sql--

ALTER TABLE users
ADD COLUMN password_hash TEXT NOT 
NULL;