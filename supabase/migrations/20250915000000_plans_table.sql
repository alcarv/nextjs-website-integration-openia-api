-- Table to store available subscription plans
CREATE TABLE IF NOT EXISTS plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  price numeric(10,2) NOT NULL,
  humanizations_per_month integer,
  word_limit integer,
  created_at timestamptz DEFAULT now()
);

-- Seed default plans
INSERT INTO plans (slug, name, price, humanizations_per_month, word_limit) VALUES
  ('free', 'Gratuito', 0, 3, 200),
  ('pro', 'Pro', 29, 100, 2000),
  ('premium', 'Premium', 79, NULL, NULL);
