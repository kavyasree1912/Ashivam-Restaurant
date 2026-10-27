/*
# Create restaurant operations tables

1. New Tables
- `restaurant_reservations` stores guest table requests submitted from the public restaurant website.
- `restaurant_orders` stores dashboard orders, guest details, order type, table, total, and workflow status.
- `restaurant_menu_items` stores dishes that can be added from the dashboard.

2. Security
- Row Level Security is enabled on all three tables.
- This is a single-tenant restaurant site without sign-in, so the public website uses the anon role.
- CRUD access is granted to anon and authenticated with explicit policies for each operation.

3. Important Notes
- The tables are intentionally shared because this project does not currently contain an account/sign-in screen.
- Order and menu writes are validated by database checks for allowed status, order type, dish type, and positive amounts.
*/

CREATE TABLE IF NOT EXISTS public.restaurant_reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name text NOT NULL,
  email text NOT NULL,
  reservation_date date NOT NULL,
  reservation_time text NOT NULL,
  guests integer NOT NULL DEFAULT 2 CHECK (guests BETWEEN 1 AND 20),
  notes text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.restaurant_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text NOT NULL UNIQUE,
  guest_name text NOT NULL,
  order_type text NOT NULL CHECK (order_type IN ('Dine In', 'Takeaway', 'Delivery')),
  table_number text,
  total numeric(10,2) NOT NULL CHECK (total >= 0),
  status text NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Preparing', 'Ready', 'Completed', 'Cancelled')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.restaurant_menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  dish_type text NOT NULL CHECK (dish_type IN ('Veg', 'Non-Veg')),
  price numeric(10,2) NOT NULL CHECK (price >= 0),
  description text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.restaurant_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurant_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurant_menu_items ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.restaurant_reservations TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.restaurant_orders TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.restaurant_menu_items TO anon, authenticated;

DROP POLICY IF EXISTS "Public can select reservations" ON public.restaurant_reservations;
CREATE POLICY "Public can select reservations" ON public.restaurant_reservations FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Public can insert reservations" ON public.restaurant_reservations;
CREATE POLICY "Public can insert reservations" ON public.restaurant_reservations FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Public can update reservations" ON public.restaurant_reservations;
CREATE POLICY "Public can update reservations" ON public.restaurant_reservations FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Public can delete reservations" ON public.restaurant_reservations;
CREATE POLICY "Public can delete reservations" ON public.restaurant_reservations FOR DELETE TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public can select orders" ON public.restaurant_orders;
CREATE POLICY "Public can select orders" ON public.restaurant_orders FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Public can insert orders" ON public.restaurant_orders;
CREATE POLICY "Public can insert orders" ON public.restaurant_orders FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Public can update orders" ON public.restaurant_orders;
CREATE POLICY "Public can update orders" ON public.restaurant_orders FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Public can delete orders" ON public.restaurant_orders;
CREATE POLICY "Public can delete orders" ON public.restaurant_orders FOR DELETE TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public can select menu items" ON public.restaurant_menu_items;
CREATE POLICY "Public can select menu items" ON public.restaurant_menu_items FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Public can insert menu items" ON public.restaurant_menu_items;
CREATE POLICY "Public can insert menu items" ON public.restaurant_menu_items FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Public can update menu items" ON public.restaurant_menu_items;
CREATE POLICY "Public can update menu items" ON public.restaurant_menu_items FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Public can delete menu items" ON public.restaurant_menu_items;
CREATE POLICY "Public can delete menu items" ON public.restaurant_menu_items FOR DELETE TO anon, authenticated USING (true);
