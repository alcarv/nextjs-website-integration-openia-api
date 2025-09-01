-- Ensure a free plan exists and reset users default/constraint

-- Add free plan if missing
INSERT INTO plans (slug, name, price, humanizations_per_month, word_limit, character_quota)
SELECT 'free', 'Gratuito', 0, 3, 200, NULL
WHERE NOT EXISTS (SELECT 1 FROM plans WHERE slug = 'free');

-- Update users.plan default back to 'free' and include 'free' in constraint
DO $$
BEGIN
  BEGIN
    ALTER TABLE users DROP CONSTRAINT IF EXISTS users_plan_check;
  EXCEPTION WHEN others THEN NULL; END;

  ALTER TABLE users ALTER COLUMN plan SET DEFAULT 'free';
  ALTER TABLE users ADD CONSTRAINT users_plan_check CHECK (
    plan IN ('free','basic','intermediate','advanced','professional')
  );
END $$;

