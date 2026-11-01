import { z } from "zod";
import type { Company } from "@radar/domain";

export const companySearchSchema = z.object({ cnaes: z.array(z.string()).optional(), city: z.literal("São Paulo").optional(), status: z.literal("ATIVA").optional(), hasWebsite: z.boolean().optional(), minScore: z.number().min(0).max(100).optional() });
export type CompanySearchFilters = z.infer<typeof companySearchSchema>;
export interface CompanyDataProvider { searchCompanies(filters: CompanySearchFilters): Promise<{ items: Company[]; total: number }>; getCompanyByCnpj(cnpj: string): Promise<Company | null>; getSourceMetadata(): { name: string; mode: "mock" | "licensed"; collectedAt: string }; }

const now = "2026-11-01T12:00:00.000Z";
export const demoCompanies: Company[] = [
  { id: "cmp_aurora", legalName: "Aurora Instalações Elétricas Ltda.", tradeName: "Aurora Elétrica", cnpj: "00.000.000/0001-00", city: "São Paulo", state: "SP", cnae: "4321500", cnaeLabel: "Instalação e manutenção elétrica", status: "ATIVA", size: "ME", hasWebsite: false, hasPhone: true, score: 55, stage: "PRIORIZADO", nextAction: "Revisar análise e ligar manualmente", nextActionAt: "2026-11-01T15:00:00.000Z", source: "Dados de demonstração", evidence: { source: "MockCompanyDataProvider", collectedAt: now, confidence: 100, note: "Registro fictício; identificador propositalmente inválido" }, tags: ["instalador", "sem-site"] },
  { id: "cmp_lumen", legalName: "Lumen Comércio Elétrico Ltda.", tradeName: "Lumen Materiais", cnpj: "00.000.000/0002-00", city: "São Paulo", state: "SP", cnae: "4742300", cnaeLabel: "Comércio varejista de material elétrico", status: "ATIVA", size: "EPP", hasWebsite: true, hasPhone: true, score: 58, stage: "EM_ANALISE", nextAction: "Qualificar catálogo e canal de contato", nextActionAt: "2026-11-02T14:00:00.000Z", source: "Dados de demonstração", evidence: { source: "MockCompanyDataProvider", collectedAt: now, confidence: 100, note: "Registro fictício; identificador propositalmente inválido" }, tags: ["varejo", "catalogo"] },
  { id: "cmp_volt", legalName: "Volt Atacado de Componentes Ltda.", tradeName: "Volt Atacado", cnpj: "00.000.000/0003-00", city: "São Paulo", state: "SP", cnae: "4673700", cnaeLabel: "Comércio atacadista de material elétrico", status: "ATIVA", size: "DEMAIS", hasWebsite: true, hasPhone: false, score: 48, stage: "NOVO", source: "Dados de demonstração", evidence: { source: "MockCompanyDataProvider", collectedAt: now, confidence: 100, note: "Registro fictício; identificador propositalmente inválido" }, tags: ["atacado"] }
];

export class MockCompanyDataProvider implements CompanyDataProvider {
  async searchCompanies(raw: CompanySearchFilters) {
    const filters = companySearchSchema.parse(raw);
    const items = demoCompanies.filter(c => (!filters.cnaes || filters.cnaes.includes(c.cnae)) && (!filters.city || c.city === filters.city) && (!filters.status || c.status === filters.status) && (filters.hasWebsite === undefined || c.hasWebsite === filters.hasWebsite) && (!filters.minScore || c.score >= filters.minScore));
    return { items, total: items.length };
  }
  async getCompanyByCnpj(cnpj: string) { return demoCompanies.find(item => item.cnpj.replace(/\D/g, "") === cnpj.replace(/\D/g, "")) ?? null; }
  getSourceMetadata() { return { name: "MockCompanyDataProvider", mode: "mock" as const, collectedAt: now }; }
}

export interface PhoneValidationProvider { validate(phone: string): Promise<{ normalizedE164?: string; syntaxStatus: "VALIDO" | "INVALIDO"; lineType: "MOVEL" | "FIXO" | "DESCONHECIDO"; carrier?: string; activeStatus: "NAO_VERIFICADO"; source: string; checkedAt: string; confidence: number }>; }
