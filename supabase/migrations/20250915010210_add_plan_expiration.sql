-- Add plan expiration tracking to users
ALTER TABLE users ADD COLUMN IF NOT EXISTS plan_expires_at timestamptz;

-- Optional index to speed up queries on expiration
CREATE INDEX IF NOT EXISTS idx_users_plan_expires_at ON users(plan_expires_at);

