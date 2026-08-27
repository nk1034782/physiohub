CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS conditions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  category text,
  body_region text,
  level text,
  content jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS exercises (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text,
  procedure text,
  sets text,
  repetitions text,
  precautions text,
  media jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS mcqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text,
  options jsonb,
  correct_index int,
  explanation text,
  category text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS uploads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name text,
  path text,
  mime text,
  size int,
  title text,
  description text,
  category text,
  year int,
  created_at timestamptz DEFAULT now()
);
