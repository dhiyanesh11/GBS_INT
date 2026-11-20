CREATE TABLE IF NOT EXISTS projects (
  id text PRIMARY KEY, title varchar(100) NOT NULL, slug varchar(100) NOT NULL UNIQUE,
  type varchar(20) NOT NULL CHECK(type IN ('Residential','Commercial')),
  location varchar(100) NOT NULL, description varchar(2000) NOT NULL,
  images text[] NOT NULL CHECK(cardinality(images) BETWEEN 1 AND 20), sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name varchar(100) NOT NULL, phone varchar(20) NOT NULL,
  email varchar(254), city varchar(100) NOT NULL, property_type varchar(20) NOT NULL CHECK(property_type IN ('Home','Commercial')),
  service varchar(100) NOT NULL, budget varchar(100), message varchar(2000), consent boolean NOT NULL CHECK(consent),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS enquiries_name_idx ON enquiries(lower(name));
CREATE INDEX IF NOT EXISTS enquiries_phone_idx ON enquiries(phone);
CREATE TABLE IF NOT EXISTS enquiry_rate_limits(key text PRIMARY KEY,window_started timestamptz NOT NULL DEFAULT now(),attempts integer NOT NULL DEFAULT 0);
