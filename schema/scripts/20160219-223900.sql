CREATE TABLE accounts (
  id bigserial PRIMARY KEY,
  guid uuid NOT NULL,
  email text NOT NULL,
  handle text NOT NULL,
  name text,
  password_hash text NOT NULL,
  created_at timestamptz NOT NULL default now(),
  updated_at timestamptz NOT NULL default now(),
  deleted_at timestamptz,
  deleted_by bigint REFERENCES accounts
);

CREATE UNIQUE INDEX accounts_guid_idx ON accounts (guid);
CREATE UNIQUE INDEX accounts_email_idx ON accounts (email);
CREATE UNIQUE INDEX accounts_handle_idx ON accounts (handle);
CREATE INDEX accounts_name_idx ON accounts (name);

INSERT INTO accounts (guid, email, handle, name, password_hash, created_at, updated_at) VALUES
  ('b8b52d67-fc1a-4d23-b51f-ab964f6a3a36', 'khy@me.com', 'khy', 'Kevin Hyland', '$2a$10$0o8DuhgmGdwNbN./XN8g0ergrpiocyHhb6yYnHdObN630S9YbnADG', timestamp '2015-02-26T04:15:25.982Z', timestamp '2015-02-26T04:15:25.982Z'),
  ('4c67d062-b663-43bb-a283-758f3502dc45', 'Garveymm@gmail.com', 'Garveymm', 'Meghan Garvey', '$2a$10$FZPk4ucwoef3jEi/zJ5eUuCStZkkaV9e8ZTRCxdWAKJvw6dfXWTya', timestamp '2014-07-07T11:01:12.888Z', timestamp '2014-07-07T11:01:12.888Z');

CREATE TABLE access_tokens (
  id bigserial PRIMARY KEY,
  account_id bigint NOT NULL REFERENCES accounts,
  oauth_provider text NOT NULL,
  resource_owner_id text NOT NULL,
  token text NOT NULL,
  code text,
  scopes text[],
  created_at timestamptz NOT NULL default now(),
  created_by bigint NOT NULL REFERENCES accounts,
  deleted_at timestamptz,
  deleted_by bigint REFERENCES accounts
);

CREATE INDEX access_tokens_account_id_idx ON access_tokens (account_id);

INSERT INTO access_tokens (account_id, oauth_provider, resource_owner_id, token, code, scopes, created_at, created_by) VALUES
  ((SELECT id FROM accounts WHERE handle = 'khy'), 'useless', '2a436fb0-7336-4f19-bde7-61570c05640c', '71a6828a-d20f-4fa6-8b2b-05a254487bda', '335d3cf9-8d3d-4335-b25d-eb8f57625d6e', '{}', timestamp '2015-02-28T02:27:22.781Z', (SELECT id FROM accounts WHERE handle = 'khy'));
