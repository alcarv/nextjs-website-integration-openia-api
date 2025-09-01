-- Add characters_used tracking and migrate plan slugs
ALTER TABLE users ADD COLUMN IF NOT EXISTS characters_used integer NOT NULL DEFAULT 0;

-- Update plan constraint to new slugs
DO $$
BEGIN
  -- Try to drop existing constraint if present
  BEGIN
    ALTER TABLE users DROP CONSTRAINT IF EXISTS users_plan_check;
  EXCEPTION WHEN others THEN
    NULL;
  END;

  -- Set default to basic and add new check constraint
  ALTER TABLE users ALTER COLUMN plan SET DEFAULT 'basic';
  ALTER TABLE users ADD CONSTRAINT users_plan_check CHECK (plan IN ('basic','intermediate','advanced','professional'));
END $$;

-- Map old plan values to new slugs, if any remain
UPDATE users SET plan = 'intermediate' WHERE plan = 'pro';
UPDATE users SET plan = 'advanced' WHERE plan = 'premium';
UPDATE users SET plan = 'basic' WHERE plan = 'free';

