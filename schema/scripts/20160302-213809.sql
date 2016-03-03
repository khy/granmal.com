CREATE TABLE account_app_states (
  id bigserial PRIMARY KEY,
  account_id bigint NOT NULL REFERENCES accounts,
  app_key text NOT NULL,
  state jsonb NOT NULL default '{}'::jsonb,
  updated_at timestamptz NOT NULL default now()
);

CREATE UNIQUE INDEX account_app_states_account_id_app_key_unq_idx ON account_app_states (account_id, app_key);
