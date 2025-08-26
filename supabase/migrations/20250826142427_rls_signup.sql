/*
  # Corrigir política RLS para permitir signup de usuários

  1. Problema
    - As políticas RLS estão impedindo a criação de usuários durante o signup
    - O processo de signup do Supabase cria o usuário no auth.users primeiro, depois tenta inserir na tabela users
    - Mas as políticas atuais não permitem essa inserção

  2. Solução
    - Remover todas as políticas restritivas existentes
    - Criar políticas que funcionem corretamente com o fluxo de signup do Supabase
    - Permitir inserção durante o processo de autenticação

  3. Segurança
    - Manter proteção para leitura e atualização
    - Permitir inserção apenas com ID válido do auth.users
*/

-- Remover todas as políticas existentes da tabela users
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Users can insert own data" ON users;
DROP POLICY IF EXISTS "Users can insert own data during signup" ON users;
DROP POLICY IF EXISTS "Allow insert during signup" ON users;

-- Criar política para leitura (usuários podem ler apenas seus próprios dados)
CREATE POLICY "users_select_own" ON users
  FOR SELECT
  USING (auth.uid() = id);

-- Criar política para atualização (usuários podem atualizar apenas seus próprios dados)
CREATE POLICY "users_update_own" ON users
  FOR UPDATE
  USING (auth.uid() = id);

-- Criar política para inserção que funciona com o signup
-- Permite inserção se o ID corresponde ao usuário autenticado OU se é um novo usuário sendo criado
CREATE POLICY "users_insert_own" ON users
  FOR INSERT
  WITH CHECK (
    auth.uid() = id OR 
    (auth.uid() IS NOT NULL AND id IN (SELECT id FROM auth.users WHERE id = auth.uid()))
  );

-- Política alternativa mais permissiva para inserção durante signup
-- Esta permite que qualquer usuário autenticado insira dados para seu próprio ID
CREATE POLICY "users_insert_authenticated" ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Remover políticas restritivas da tabela usage_logs se existirem
DROP POLICY IF EXISTS "Users can read own usage logs" ON usage_logs;
DROP POLICY IF EXISTS "Users can insert own usage logs" ON usage_logs;

-- Recriar políticas para usage_logs
CREATE POLICY "usage_logs_select_own" ON usage_logs
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "usage_logs_insert_own" ON usage_logs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);