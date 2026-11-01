# Radar Elétrico SP

Plataforma SaaS de inteligência comercial B2B e CRM para prospecção manual em São Paulo/SP. Esta entrega é uma demo funcional: usa apenas dados fictícios, mostra a origem dos dados e não faz contato, scraping proibido nem consultas externas sem configuração explícita.

## Início rápido

1. `Copy-Item .env.example .env`
2. `pnpm install --frozen-lockfile`
3. `docker compose up -d postgres`
4. `pnpm db:generate && pnpm db:migrate`
5. `pnpm dev`
6. Abra `http://localhost:3000`.

Para executar tudo em contêineres: `docker compose up --build`.

## Qualidade

`pnpm lint` · `pnpm typecheck` · `pnpm test` · `pnpm build` · `pnpm test:e2e`

## Limites da demo

- Autenticação, RBAC e auditoria estão modelados no banco; a interface atual usa o workspace demonstrativo.
- `MockCompanyDataProvider` é o único provedor ativo. Receita Federal, Google Places, validação externa de telefone e IA real requerem credenciais, contrato e revisão de termos.
- Não há CNPJ, telefone ou pessoa real nos dados de seed. Não se deve inferir WhatsApp, atividade de linha ou características pessoais.

Consulte [docs/plan.md](docs/plan.md), [docs/architecture.md](docs/architecture.md), [docs/security.md](docs/security.md) e [docs/privacy.md](docs/privacy.md).
