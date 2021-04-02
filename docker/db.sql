CREATE TABLE users (
  username character varying(128) PRIMARY KEY,
  password character varying(128) NOT NULL
);

CREATE TABLE todos (
  id serial PRIMARY KEY,
  title character varying(128) NOT NULL,
  description character varying(512) NOT NULL DEFAULT '',
  completed boolean NOT NULL DEFAULT 'false',
  user_id character varying(128) REFERENCES users(username)
);
