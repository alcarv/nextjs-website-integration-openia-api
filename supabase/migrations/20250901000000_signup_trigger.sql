/*
  # Trigger to populate users table on signup

  1. Create trigger to insert into public.users when a new auth.user is created.
  2. Remove manual insert policies as insertion is handled automatically.
*/

-- Drop old insert policies no longer needed
DROP POLICY IF EXISTS "users_insert_own" ON users;
DROP POLICY IF EXISTS "users_insert_authenticated" ON users;
DROP POLICY IF EXISTS "users_insert_anon" ON users;

-- Function to copy data from auth.users to public.users
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email, name, plan, usage_count, usage_reset_date)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    'free',
    0,
    now() + interval '30 days'
  );
  RETURN NEW;
END;
$$;

-- Trigger to run the function after a new auth.user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_auth_user();
