alter table public.leads
  add column if not exists locale text;

update public.leads
set locale = 'pt'
where locale is null;

alter table public.leads
  alter column locale set default 'pt',
  alter column locale set not null;

alter table public.leads
  drop constraint if exists leads_locale_check;

alter table public.leads
  add constraint leads_locale_check
  check (locale in ('pt', 'en', 'es', 'it'));
