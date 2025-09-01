-- Update plans to character-based quotas and seed new tiers
ALTER TABLE plans ADD COLUMN IF NOT EXISTS character_quota bigint;

-- Replace existing plans with new character-based plans
TRUNCATE TABLE plans;

INSERT INTO plans (slug, name, price, character_quota, humanizations_per_month, word_limit)
VALUES
  ('basic', 'Básico', 17.90, 100000, NULL, NULL),
  ('intermediate', 'Intermediário', 29.90, 200000, NULL, NULL),
  ('advanced', 'Avançado', 89.90, 1000000, NULL, NULL),
  ('professional', 'Profissional', 329.00, 4000000, NULL, NULL);

