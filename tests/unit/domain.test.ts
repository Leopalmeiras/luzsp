import { describe, expect, it } from "vitest";
import { calculateScore, isValidCnpj, nextActionFor, normalizeBrazilPhone } from "@radar/domain";
import { demoCompanies, MockCompanyDataProvider } from "@radar/providers";

describe("domínio comercial", () => {
  it("calcula score explicável sem pontuar dados ausentes", () => { const result = calculateScore(demoCompanies[0]!); expect(result.total).toBe(55); expect(result.explanation).toHaveLength(6); expect(result.explanation.find(item => item.rule === "Site acessível")?.applied).toBe(false); });
  it("normaliza telefone brasileiro sem alegar atividade", () => { expect(normalizeBrazilPhone("(11) 99876-5432")).toEqual({ normalizedE164: "+5511998765432", syntaxStatus: "VALIDO", lineType: "MOVEL" }); expect(normalizeBrazilPhone("123").syntaxStatus).toBe("INVALIDO"); });
  it("valida CNPJ com dígitos verificadores", () => { expect(isValidCnpj("11.222.333/0001-81")).toBe(true); expect(isValidCnpj("11.222.333/0001-80")).toBe(false); });
  it("prioriza a ausência comprovada de site sem fazer afirmações causais", () => { expect(nextActionFor(demoCompanies[0]!)).toContain("presença digital"); });
  it("filtra o provedor de demonstração", async () => { const provider = new MockCompanyDataProvider(); const result = await provider.searchCompanies({ cnaes: ["4321500"], status: "ATIVA" }); expect(result.total).toBe(1); expect(provider.getSourceMetadata().mode).toBe("mock"); });
});
