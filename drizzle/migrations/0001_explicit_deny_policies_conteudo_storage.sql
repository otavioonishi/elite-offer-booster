-- Explicit deny policies: no browser client (anon/authenticated) may read or
-- write files in the private 'conteudo' bucket. Access happens only through
-- server functions using the service role, which issues short-lived signed URLs.

DROP POLICY IF EXISTS "conteudo no client select" ON storage.objects;
DROP POLICY IF EXISTS "conteudo no client insert" ON storage.objects;
DROP POLICY IF EXISTS "conteudo no client update" ON storage.objects;
DROP POLICY IF EXISTS "conteudo no client delete" ON storage.objects;

CREATE POLICY "conteudo no client select"
ON storage.objects FOR SELECT TO anon, authenticated
USING (false);

CREATE POLICY "conteudo no client insert"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (false);

CREATE POLICY "conteudo no client update"
ON storage.objects FOR UPDATE TO anon, authenticated
USING (false) WITH CHECK (false);

CREATE POLICY "conteudo no client delete"
ON storage.objects FOR DELETE TO anon, authenticated
USING (false);
