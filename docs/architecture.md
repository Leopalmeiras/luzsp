# Arquitetura

`apps/web` contém a interface Next.js. `packages/domain` contém regras puras e tipos. `packages/providers` fornece portas para dados empresariais e telefone; o adaptador mock é o padrão. `packages/database` é a fonte do schema Prisma. A separação impede que regras de score dependam diretamente de APIs externas.

O fluxo é: provedor → validação/schema → persistência isolada por workspace → score/versionamento/auditoria → interface. Jobs externos devem ser idempotentes, limitados em concorrência, com retry/backoff e estado dead-letter.
