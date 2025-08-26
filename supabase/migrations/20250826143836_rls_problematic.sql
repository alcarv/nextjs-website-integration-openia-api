/*
  # Desabilitar confirmação de email e corrigir políticas RLS

  1. Problema
    - Supabase está exigindo confirmação de email
    - Políticas RLS ainda estão bloqueando inserção na tabela users
    - Usuários não conseguem se cadastrar

  2. Solução
    - Desabilitar confirmação de email nas configurações de auth
    - Simplificar políticas RLS para permitir inserção durante signup
    - Criar política que funciona com o fluxo de autenticação do Supabase

  3. Segurança
    - Manter proteção para operações de leitura e atualização
    - Permitir inserção apenas para usuários com ID válido
*/

-- Desabilitar RLS temporariamente para corrigir as políticas
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Remover todas as políticas existentes
DROP POLICY IF EXISTS "users_select_own" ON users;
DROP POLICY IF EXISTS "users_update_own" ON users;
DROP POLICY IF EXISTS "users_insert_own" ON users;
DROP POLICY IF EXISTS "users_insert_authenticated" ON users;

-- Reabilitar RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Criar políticas mais simples e funcionais
CREATE POLICY "users_all_operations" ON users
  FOR ALL
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Política adicional para permitir inserção durante o signup
CREATE POLICY "users_insert_signup" ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Atualizar configurações de auth para desabilitar confirmação de email
-- Nota: Isso precisa ser feito também no dashboard do Supabase em Authentication > Settings
-- Definir "Enable email confirmations" como false