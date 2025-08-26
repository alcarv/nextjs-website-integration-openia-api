/*
  # Sistema de Usuários e Controle de Uso

  1. Novas Tabelas
    - `users`
      - `id` (uuid, primary key) - ID do usuário do Supabase Auth
      - `email` (text, unique) - Email do usuário
      - `name` (text) - Nome completo
      - `plan` (text) - Plano do usuário (free/premium)
      - `usage_count` (integer) - Contador de uso mensal
      - `usage_reset_date` (timestamptz) - Data de reset do contador
      - `created_at` (timestamptz) - Data de criação

    - `usage_logs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key) - Referência ao usuário
      - `text_length` (integer) - Quantidade de palavras processadas
      - `created_at` (timestamptz) - Data do uso

  2. Segurança
    - Habilitar RLS em ambas as tabelas
    - Políticas para usuários acessarem apenas seus próprios dados
*/

-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  plan text NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'premium')),
  usage_count integer NOT NULL DEFAULT 0,
  usage_reset_date timestamptz NOT NULL DEFAULT (now() + interval '30 days'),
  created_at timestamptz DEFAULT now()
);

-- Criar tabela de logs de uso
CREATE TABLE IF NOT EXISTS usage_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  text_length integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;

-- Políticas para tabela users
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Políticas para tabela usage_logs
CREATE POLICY "Users can read own usage logs"
  ON usage_logs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own usage logs"
  ON usage_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Função para resetar contador de uso mensalmente
CREATE OR REPLACE FUNCTION reset_monthly_usage()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE users 
  SET 
    usage_count = 0,
    usage_reset_date = now() + interval '30 days'
  WHERE usage_reset_date <= now();
END;
$$;