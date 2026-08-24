// === Snippet di codice reali estratti dai codebase Factum + factum-fic ===

export const curlSnippet = `curl -X POST https://factum.pyragogy.org/v1/parse \\
  -H "X-API-Key: \${FACTUM_API_KEY}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Fattura n. INV-001 del 15/08/2026",
    "doc_type": "fattura"
  }'`;

export const pythonSnippet = `import httpx

async def parse_invoice(text: str, api_key: str):
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            "https://factum.pyragogy.org/v1/parse",
            headers={"X-API-Key": api_key},
            json={"text": text, "doc_type": "fattura"},
        )
        data = resp.json()
    return data["result"]  # supplier, importo, IVA, data, ...`;

export const responseSnippet = JSON.stringify(
  {
    status: "done",
    document_type: "fattura",
    confidence: 0.97,
    result: {
      supplier_name: "Hetzner GmbH",
      supplier_vat: "DE812345678",
      supplier_country: "DE",
      invoice_number: "INV-2026-007",
      invoice_date: "15/08/2026",
      total: 49.79,
      currency: "EUR",
      raw: {
        amount_net: 41.0,
        amount_vat: 8.79,
        amount_gross: 49.79,
      },
    },
  },
  null,
  2
);

export const cliHelpSnippet = `$ factum-fic --help

🇮🇹  Factum-FIC — Registrazione automatica fatture su Fatture in Cloud

Alias italiani: configura=setup, stato=status,
elabora=sync, auto=watch, ricarica=buy-credits

Comandi:
  setup            Configurazione guidata (una volta sola)
  sync  [elabora]  Elabora tutti i file in da_elaborare/
  watch [auto]     Resta in esecuzione, elabora in automatico
  status [stato]   Dashboard operativo
  ricarica         Acquista 100 PDF extra (€9,90)
  riprova-autofatture  Recupera autofatture fallite
  check            Verifica connettività API`;

export const cliUsageSnippet = `# 1. Installa (una volta)
$ pipx install git+https://github.com/FTG-003/factum-fic

# 2. Configura (una volta)
$ factum-fic setup

# 3. Lascia le fatture in da_elaborare/
$ cp ~/Downloads/fattura_*.pdf ./da_elaborare/

# 4. Un comando e hai finito
$ factum-fic elabora

✅ Spese registrate su Fatture in Cloud
✅ Autofatture TD17/TD18/TD19 in bozza pronte`;

export const sdixmlSnippet = `<?xml version="1.0" encoding="UTF-8"?>
<p:FatturaElettronica ...>
  <FatturaElettronicaHeader>
    <CedentePrestatore>
      <DatiAnagrafici>
        <IdFiscaleIVA>
          <IdPaese>DE</IdPaese>
          <IdCodice>812345678</IdCodice>
        </IdFiscaleIVA>
      </DatiAnagrafici>
    </CedentePrestatore>
  </FatturaElettronicaHeader>
</p:FatturaElettronica>

# Factum lo parsa in 41ms — zero LLM, zero costo, 100% locale`;

export const mermaidFlowSnippet = `flowchart LR
    INBOX["📥 da_elaborare/"]
    XML["XML FatturaPA"] --> LOCALE["Locale · gratis · ∞"]
    PDF["PDF fattura estera"] --> ENGINE["Factum Parse"]
    LOCALE --> SPESA["✅ Spesa su FIC"]
    ENGINE --> SPESA
    ENGINE --> BOZZA["📄 Autofattura TD17/18/19"]`;