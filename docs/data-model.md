# Modelo de dados

`Workspace` possui `Membership` (papel), `Company` e `AuditLog`. `Company` leva fonte, data de coleta, confiança, finalidade e base legal; cada empresa possui `Lead`, `Interaction` e `FollowUp`. Há índices e unicidade por `(workspaceId, cnpj)` para evitar vazamento e duplicidade entre espaços.
