# Plano de implementação

## Entregue nesta base

1. Monorepo pnpm com Next.js App Router, TypeScript estrito, Prisma/PostgreSQL e Docker Compose.
2. Painel navegável para Hoje, Radar, Leads, Pipeline, Follow-ups, Cadastros, Playbooks, Inteligência, Relatórios e Configurações.
3. Provedor mock, score explicável, validação local de CNPJ/telefone e ficha Empresa 360°.
4. Esquema de persistência para workspaces, RBAC, empresas, leads, tarefas, interações e auditoria.
5. Testes unitários e E2E, CI, CodeQL e Dependabot.

## Próximas fases controladas

1. Implementar sessão autenticada e guards RBAC no app/API.
2. Aplicar migrations e repositórios Prisma com `workspaceId` obrigatório.
3. Implementar importador CSV assíncrono com fila persistente e relatório por linha.
4. Criar worker de análise de site com allowlist, bloqueio SSRF, robots.txt, limites de tamanho, timeout e evidências mínimas.
5. Habilitar adaptadores licenciados somente via feature flags, contratos e credenciais server-side.
