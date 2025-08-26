/*
  # Allow anon insert into users table during signup

  1. Problem
    - Signup flow fails with permission error because anon role cannot insert into users table.

  2. Solution
    - Create policy allowing anon role to insert rows when ID exists in auth.users.

  3. Security
    - Ensures only valid auth user IDs can be inserted.
*/

-- Allow anon role to insert user row after signup
CREATE POLICY "users_insert_anon" ON users
  FOR INSERT
  TO anon
  WITH CHECK (id IN (SELECT id FROM auth.users));
