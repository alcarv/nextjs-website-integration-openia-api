/*
  Ensure signup trigger sets plan to 'free' and initializes counters
*/

CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email, name, plan, usage_count, characters_used, usage_reset_date)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    'free',
    0,
    0,
    now() + interval '30 days'
  );
  RETURN NEW;
END;
$$;

