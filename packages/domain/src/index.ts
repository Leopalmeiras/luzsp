export type PipelineStage =
  | "NOVO" | "EM_ANALISE" | "PRIORIZADO" | "CONTATO_PLANEJADO" | "CONTATO_REALIZADO"
  | "CONVERSA" | "REUNIAO" | "PROPOSTA" | "GANHO" | "PERDIDO" | "PAUSADO" | "NAO_CONTATAR";

export type WhatsAppStatus = "NAO_VERIFICADO" | "CONFIRMADO_MANUALMENTE" | "FONTE_AUTORIZADA" | "NAO_ENCONTRADO" | "INDISPONIVEL" | "INVALIDO";
export type PrivacyStatus = "PENDENTE" | "LEGITIMO_INTERESSE_AVALIADO" | "RESTRINGIR_CONTATO" | "EXCLUIDO";

export interface Evidence {
  source: string;
  collectedAt: string;
  confidence: number;
  url?: string;
  note?: string;
}

export interface Company {
  id: string;
  legalName: string;
  tradeName: string;
  cnpj: string;
  city: "São Paulo";
  state: "SP";
  cnae: string;
  cnaeLabel: string;
  status: "ATIVA" | "INAPTA";
  size: "ME" | "EPP" | "DEMAIS";
  hasWebsite: boolean;
  hasPhone: boolean;
  score: number;
  stage: PipelineStage;
  nextAction?: string;
  nextActionAt?: string;
  source: string;
  evidence: Evidence;
  tags: string[];
}

export interface ScoreRule {
  id: string;
  label: string;
  category: "icp" | "contact" | "digital" | "opportunity";
  points: number;
  when: (company: Company) => boolean;
  evidence: string;
}

export interface ScoreExplanation { rule: string; points: number; source: string; applied: boolean; }
export interface ScoreResult { total: number; explanation: ScoreExplanation[]; version: string; }

export const scoreRules: ScoreRule[] = [
  { id: "cnae", label: "CNAE aderente", category: "icp", points: 20, when: c => ["4321500", "4742300", "4673700"].includes(c.cnae), evidence: "Cadastro empresarial" },
  { id: "city", label: "Município aderente", category: "icp", points: 10, when: c => c.city === "São Paulo" && c.state === "SP", evidence: "Cadastro empresarial" },
  { id: "active", label: "Situação cadastral ativa", category: "icp", points: 10, when: c => c.status === "ATIVA", evidence: "Cadastro empresarial" },
  { id: "phone", label: "Telefone corporativo informado", category: "contact", points: 10, when: c => c.hasPhone, evidence: "Fonte corporativa" },
  { id: "site", label: "Site acessível", category: "digital", points: 8, when: c => c.hasWebsite, evidence: "Análise de presença digital" },
  { id: "no-site", label: "Oportunidade: ausência de site confirmada", category: "opportunity", points: 5, when: c => !c.hasWebsite, evidence: "Análise de presença digital" }
];

export function calculateScore(company: Company, rules = scoreRules): ScoreResult {
  const explanation = rules.map(rule => ({ rule: rule.label, points: rule.points, source: rule.evidence, applied: rule.when(company) }));
  return { total: explanation.filter(item => item.applied).reduce((sum, item) => sum + item.points, 0), explanation, version: "icp-demo-v1" };
}

export function normalizeBrazilPhone(value: string): { normalizedE164?: string; syntaxStatus: "VALIDO" | "INVALIDO"; lineType: "MOVEL" | "FIXO" | "DESCONHECIDO" } {
  const digits = value.replace(/\D/g, "").replace(/^55/, "");
  if (!/^[1-9]\d(?:[2-5]\d{7}|9\d{8})$/.test(digits)) return { syntaxStatus: "INVALIDO", lineType: "DESCONHECIDO" };
  return { normalizedE164: `+55${digits}`, syntaxStatus: "VALIDO", lineType: digits[2] === "9" ? "MOVEL" : "FIXO" };
}

export function isValidCnpj(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  if (!/^\d{14}$/.test(digits) || /^(\d)\1+$/.test(digits)) return false;
  const digit = (base: string, weights: number[]) => {
    const sum = [...base].reduce((acc, char, index) => acc + Number(char) * (weights[index] ?? 0), 0);
    const rest = sum % 11; return rest < 2 ? 0 : 11 - rest;
  };
  const first = digit(digits.slice(0, 12), [5,4,3,2,9,8,7,6,5,4,3,2]);
  const second = digit(digits.slice(0, 12) + first, [6,5,4,3,2,9,8,7,6,5,4,3,2]);
  return Number(digits[12]) === first && Number(digits[13]) === second;
}

export function nextActionFor(company: Company, now = new Date()): string {
  if (company.stage === "NAO_CONTATAR") return "Não criar contato; respeitar a preferência registrada.";
  if (!company.hasWebsite) return "Revisar oportunidade de presença digital e preparar abordagem manual.";
  if (!company.nextActionAt) return "Qualificar empresa e definir a próxima ação manual.";
  if (new Date(company.nextActionAt) < now) return "Executar ou reagendar follow-up manual vencido.";
  return company.nextAction ?? "Revisar ficha da empresa.";
}
