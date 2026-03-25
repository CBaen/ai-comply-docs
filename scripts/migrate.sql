-- Auth.js required tables
-- Column names match exactly what @auth/pg-adapter expects.

CREATE TABLE IF NOT EXISTS verification_token
(
  identifier TEXT NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  token TEXT NOT NULL,

  PRIMARY KEY (identifier, token)
);

CREATE TABLE IF NOT EXISTS accounts
(
  id TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "userId" TEXT NOT NULL,
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  "providerAccountId" VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  id_token TEXT,
  scope TEXT,
  session_state TEXT,
  token_type TEXT,

  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS sessions
(
  id TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "userId" TEXT NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  "sessionToken" VARCHAR(255) NOT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS users
(
  id TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  "emailVerified" TIMESTAMPTZ,
  image TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  PRIMARY KEY (id)
);

-- Foreign keys for Auth.js tables
ALTER TABLE accounts
  ADD CONSTRAINT IF NOT EXISTS "accounts_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE sessions
  ADD CONSTRAINT IF NOT EXISTS "sessions_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE;

-- Application table: purchases
-- user_id is nullable to support guest purchases (pre-authentication)
CREATE TABLE IF NOT EXISTS purchases
(
  id TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  user_id TEXT,
  stripe_session_id VARCHAR(255) NOT NULL,
  stripe_customer_id VARCHAR(255),
  regulation_slug VARCHAR(255) NOT NULL,
  amount_paid INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  email_at_purchase VARCHAR(255),

  PRIMARY KEY (id),
  CONSTRAINT purchases_stripe_session_id_key UNIQUE (stripe_session_id)
);

-- Indexes for common lookup patterns
CREATE INDEX IF NOT EXISTS purchases_user_id_idx ON purchases(user_id);
CREATE INDEX IF NOT EXISTS purchases_email_at_purchase_idx ON purchases(email_at_purchase);
CREATE INDEX IF NOT EXISTS purchases_stripe_session_id_idx ON purchases(stripe_session_id);

-- Foreign key to users (nullable, set when guest links account)
ALTER TABLE purchases
  ADD CONSTRAINT IF NOT EXISTS "purchases_user_id_fkey"
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;

-- Single-use delivery tokens — prevents replay attacks on document delivery
CREATE TABLE IF NOT EXISTS used_tokens
(
  token_key VARCHAR(512) NOT NULL,
  used_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (token_key)
);

-- Auto-expire old tokens after 24 hours (cleanup index)
CREATE INDEX IF NOT EXISTS used_tokens_used_at_idx ON used_tokens(used_at);
