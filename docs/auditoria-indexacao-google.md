# Auditoria de Indexacao Google

Data da auditoria: 15 de marco de 2026

## Resumo executivo
- O site esta tecnicamente indexavel: `robots.txt`, `sitemap.xml`, canonical e `meta robots` estao corretos.
- Problema principal identificado: os dois dominios oficiais (`fustinoni.adv.br` e `escritoriofustinoni.com.br`) respondiam com `200` sem consolidacao por redirect permanente.
- Decisao aplicada no projeto: dominio canonico definido para `https://www.escritoriofustinoni.com.br`.
- Proximo passo fora do codigo: configurar redirect `301` no dashboard da Vercel e concluir setup no Google Search Console.

## Diagnostico tecnico (confirmado em producao)
1. `https://www.fustinoni.adv.br/robots.txt` retorna `200`, com `Allow: /` e `Sitemap`.
2. `https://www.fustinoni.adv.br/sitemap.xml` retorna `200` e lista as paginas principais.
3. Paginas principais retornam `200`, canonical valido e `meta robots=index, follow`.
4. `site:` no Google nao e prova completa de indexacao; Search Console deve ser a fonte principal de status.

## Causa principal da baixa aparicao
- Dois dominios oficiais ativos sem consolidacao forte de sinais (`301` de dominio para dominio).
- Sem consolidacao, o Google pode demorar para eleger um dominio principal e consolidar relevancia.

## Implementacao aplicada no repositorio
1. `src/lib/site.ts`
- Fallback alterado para `https://www.escritoriofustinoni.com.br`.

2. `.env.local`
- `NEXT_PUBLIC_SITE_URL` atualizado para `https://www.escritoriofustinoni.com.br`.

3. Documentacao
- Pasta `docs/` criada.
- Este documento adicionado para registrar diagnostico, checklist e criterios de sucesso.

## Itens de infraestrutura (Vercel) para executar
1. Em `Domains` da Vercel, criar redirect permanente:
- `https://fustinoni.adv.br/*` -> `https://www.escritoriofustinoni.com.br/:path*`
- `https://www.fustinoni.adv.br/*` -> `https://www.escritoriofustinoni.com.br/:path*`

2. Garantir preservacao de:
- `path`
- `query string`

3. Validar depois da configuracao:
- `https://www.fustinoni.adv.br/fator-k` deve responder `301` para `https://www.escritoriofustinoni.com.br/fator-k`

## Checklist Search Console
1. Adicionar propriedade de dominio `escritoriofustinoni.com.br` e verificar via DNS TXT.
2. Adicionar tambem `fustinoni.adv.br` para monitorar cobertura e redirects.
3. Enviar sitemap canonico:
- `https://www.escritoriofustinoni.com.br/sitemap.xml`
4. Em Inspecao de URL, solicitar indexacao para:
- `/`
- `/analise-credito`
- `/fator-k`
5. Monitorar em `Paginas`:
- URLs canonicas como "URL esta no Google"
- Dominio antigo aparecendo como "Pagina com redirecionamento" (esperado)

## Criterios de sucesso
1. Dominio antigo sempre redireciona com `301` para o dominio canonico.
2. `robots.txt` e `sitemap.xml` no canonico apontam apenas para URLs do `escritoriofustinoni.com.br`.
3. Paginas principais no canonico exibem canonical self-referencing e `index, follow`.
4. Search Console mostra sitemap processado e URLs principais com status de indexacao.

## Observacoes
- O operador `site:` no Google pode omitir paginas indexadas. Use Search Console como verdade principal.
- Mesmo com configuracao correta, indexacao pode levar de alguns dias a algumas semanas.
