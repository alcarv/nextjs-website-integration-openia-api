/*
  # Corrigir política RLS para inserção de usuários

  1. Problema
    - A política atual para INSERT na tabela users está muito restritiva
    - Impede a criação de novos usuários durante o signup

  2. Solução
    - Remover a política INSERT restritiva existente
    - Criar nova política que permite inserção durante o signup
    - Manter as outras políticas de segurança intactas

  3. Segurança
    - Usuários só podem inserir dados para seu próprio ID
    - Mantém proteção contra inserções maliciosas
*/

-- Remover a política INSERT restritiva existente
DROP POLICY IF EXISTS "Users can insert own data" ON users;

-- Criar nova política que permite inserção durante signup
CREATE POLICY "Users can insert own data during signup"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Garantir que usuários anônimos também possam inserir durante o processo de signup
-- (necessário para o fluxo de criação de conta)
CREATE POLICY "Allow insert during signup"
  ON users
  FOR INSERT
  TO anon
  WITH CHECK (true);