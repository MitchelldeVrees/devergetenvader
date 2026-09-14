CREATE SCHEMA IF NOT EXISTS bookshop;
CREATE TABLE IF NOT EXISTS bookshop.orders (
  id uuid PRIMARY KEY,
  request_id uuid NOT NULL UNIQUE,
  input_hash text NOT NULL,
  token_hash text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  shipping_address jsonb NOT NULL,
  quantity integer NOT NULL CHECK (quantity BETWEEN 1 AND 10),
  format text NOT NULL CHECK (format = 'paperback'),
  unit_price integer NOT NULL CHECK (unit_price > 0),
  shipping_cost integer NOT NULL CHECK (shipping_cost >= 0),
  amount_total integer NOT NULL CHECK (amount_total = unit_price * quantity + shipping_cost),
  amount_paid integer NOT NULL DEFAULT 0,
  payment_status text NOT NULL DEFAULT 'created',
  payment_id text UNIQUE,
  payment_mode text NOT NULL CHECK (payment_mode IN ('test', 'live')),
  checkout_url text,
  payment_request jsonb NOT NULL,
  preorder_status text NOT NULL DEFAULT 'awaiting_payment',
  expected_shipping_period text NOT NULL,
  terms_version text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_checked_at timestamptz,
  paid_at timestamptz,
  email_payload jsonb,
  email_first_attempt_at timestamptz,
  email_sent_at timestamptz,
  email_provider_id text
);
CREATE INDEX IF NOT EXISTS orders_pending_idx ON bookshop.orders (created_at) WHERE payment_status <> 'paid';
CREATE INDEX IF NOT EXISTS orders_confirmation_idx ON bookshop.orders (paid_at) WHERE payment_status = 'paid' AND email_sent_at IS NULL;
CREATE TABLE IF NOT EXISTS bookshop.rate_limits (
  key text PRIMARY KEY,
  hits integer NOT NULL,
  expires_at timestamptz NOT NULL
);

-- Server-side SQL only. No public/anonymous access through Supabase Data API.
ALTER TABLE bookshop.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookshop.rate_limits ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON SCHEMA bookshop FROM PUBLIC;
REVOKE ALL ON ALL TABLES IN SCHEMA bookshop FROM PUBLIC;
