/*
  # Corrigir política RLS para permitir signup

  1. Problema
    - Políticas RLS estão bloqueando inserção na tabela users
    - Erro 403 ao tentar inserir novo usuário
    - Signup não funciona devido a políticas muito restritivas

  2. Solução
    - Desabilitar RLS temporariamente
    - Remover todas as políticas problemáticas
    - Criar políticas funcionais que permitam signup
    - Reabilitar RLS com políticas corretas

  3. Segurança
    - Manter proteção para leitura (usuários só veem seus dados)
    - Permitir inserção para usuários autenticados
    - Permitir atualização apenas dos próprios dados
*/

-- Desabilitar RLS temporariamente para limpeza
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Remover TODAS as políticas existentes
DO $$ 
DECLARE
    policy_name text;
BEGIN
    FOR policy_name IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'users'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(policy_name) || ' ON users';
    END LOOP;
END $$;

-- Reabilitar RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Criar política simples para SELECT (usuários podem ler apenas seus dados)
CREATE POLICY "users_select_policy" ON users
    FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

-- Criar política permissiva para INSERT (permitir inserção durante signup)
CREATE POLICY "users_insert_policy" ON users
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = id);

-- Criar política para UPDATE (usuários podem atualizar apenas seus dados)
CREATE POLICY "users_update_policy" ON users
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Verificar se as políticas foram criadas corretamente
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'users';