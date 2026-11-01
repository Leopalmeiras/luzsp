# API e provedores

Porta empresarial: `searchCompanies(filters)`, `getCompanyByCnpj(cnpj)` e `getSourceMetadata()`. Toda entrada deve ser validada por schema e toda resposta externa tratada como não confiável. A rota de exportação deve verificar RBAC, finalidade e registrar `AuditLog` com motivo.
