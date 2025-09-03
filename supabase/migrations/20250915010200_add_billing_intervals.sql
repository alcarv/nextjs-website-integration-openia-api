-- Add monthly and annual pricing columns to plans and backfill
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'plans' AND column_name = 'price_monthly'
  ) THEN
    ALTER TABLE plans ADD COLUMN price_monthly numeric(10,2);
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'plans' AND column_name = 'price_annual'
  ) THEN
    ALTER TABLE plans ADD COLUMN price_annual numeric(10,2);
  END IF;

  -- Backfill: set price_monthly from existing price if null
  UPDATE plans
  SET price_monthly = COALESCE(price_monthly, price);

  -- Backfill: default annual price to 12x monthly if null (adjust later as needed)
  UPDATE plans
  SET price_annual = COALESCE(price_annual, (price_monthly * 12.0));
END $$;

-- Optional: Ensure non-negative values
ALTER TABLE plans
  ADD CONSTRAINT plans_price_monthly_check CHECK (price_monthly IS NULL OR price_monthly >= 0),
  ADD CONSTRAINT plans_price_annual_check CHECK (price_annual IS NULL OR price_annual >= 0);

