-- =========================================================================
-- SRR FARMS FULL SUPABASE DATABASE PROVISIONING SCHEMA (FRESH START & IDEMPOTENT)
-- =========================================================================
-- Copy and paste this ENTIRE script into the Supabase SQL Editor and click 'Run'.

-- Optional: Wipe existing tables to start fresh
DROP TABLE IF EXISTS public.orders, public.profiles, public.admins, public.batches CASCADE;

-- 1. Admins Credentials Table
CREATE TABLE public.admins (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed Admin Account
INSERT INTO public.admins (email, password)
VALUES ('sathishdusharla@srrfarms.com', '@Sathish24')
ON CONFLICT (email) DO UPDATE SET password = EXCLUDED.password;

-- 2. Customer Profiles & Saved Addresses Table
CREATE TABLE public.profiles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  full_name text,
  loyalty_tier text DEFAULT 'Heritage Tier Member',
  saved_addresses text[] DEFAULT '{}'::text[] NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Customer Orders & Subscriptions Table
CREATE TABLE public.orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email text NOT NULL,
  items jsonb NOT NULL,
  total_amount numeric NOT NULL,
  status text DEFAULT 'Pending' CHECK (status IN ('Pending', 'Processing', 'Shipped', 'Cancelled')),
  shipping_address text,
  phone text,
  purchase_type text DEFAULT 'onetime' CHECK (purchase_type IN ('onetime', 'subscribe')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Batches Traceability Table
CREATE TABLE public.batches (
  batch_no text PRIMARY KEY,
  milking_date text NOT NULL,
  churn_date text NOT NULL,
  pasture_origin text NOT NULL,
  acidity text NOT NULL,
  cow_shelter text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed Default Traceability Batches
INSERT INTO public.batches (batch_no, milking_date, churn_date, pasture_origin, acidity, cow_shelter)
VALUES 
  ('78', 'July 15, 2026', 'July 17, 2026', 'West Foothills Alfalfa Pastures', '0.28% Free Fatty Acids', 'Purebred Gir Cows (Shelter #3)'),
  ('77', 'July 10, 2026', 'July 12, 2026', 'Sorghum Meadows (East Field)', '0.31% Free Fatty Acids', 'Purebred Gir cows (Shelter #1)'),
  ('76', 'July 05, 2026', 'July 07, 2026', 'Organic Clover Pastures', '0.29% Free Fatty Acids', 'Purebred Gir cows (Shelter #4)')
ON CONFLICT (batch_no) DO UPDATE SET
  milking_date = EXCLUDED.milking_date,
  churn_date = EXCLUDED.churn_date,
  pasture_origin = EXCLUDED.pasture_origin,
  acidity = EXCLUDED.acidity,
  cow_shelter = EXCLUDED.cow_shelter;

-- 5. Open Permissions & Row Level Security Configuration
ALTER TABLE public.admins DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.batches DISABLE ROW LEVEL SECURITY;

-- Fallback RLS Policies (allows inserts even if RLS is enabled in dashboard)
DROP POLICY IF EXISTS "Allow public insert on orders" ON public.orders;
CREATE POLICY "Allow public insert on orders" ON public.orders FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public select on orders" ON public.orders;
CREATE POLICY "Allow public select on orders" ON public.orders FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public update on orders" ON public.orders;
CREATE POLICY "Allow public update on orders" ON public.orders FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public all on profiles" ON public.profiles;
CREATE POLICY "Allow public all on profiles" ON public.profiles FOR ALL USING (true) WITH CHECK (true);

GRANT ALL ON TABLE public.admins TO anon, authenticated, postgres, service_role;
GRANT ALL ON TABLE public.profiles TO anon, authenticated, postgres, service_role;
GRANT ALL ON TABLE public.orders TO anon, authenticated, postgres, service_role;
GRANT ALL ON TABLE public.batches TO anon, authenticated, postgres, service_role;

-- 6. Safe Realtime Publication Setup
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    CREATE PUBLICATION supabase_realtime;
  END IF;
  
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.batches;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;
END $$;
