-- Applied on production via Supabase MCP; keep in repo for environments / review.
alter table public.leads
add column if not exists fator_k_extrato_uploads jsonb not null default '[]'::jsonb;

comment on column public.leads.fator_k_extrato_uploads is
  'JSON array: bucket, path, original_name, uploaded_at, fator_k_found, parse_ok';

-- Bucket `fator-k-extratos` must be created in Dashboard (Storage) if SQL insert into
-- storage.buckets is not permitted: private, ~10MB limit, MIME application/pdf.
