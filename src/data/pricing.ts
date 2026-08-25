// === Dati prezzi, feature, metriche ===

export interface PricingTier {
  name: string;
  subtitle: string;
  price: string;
  priceSuffix: string;
  description: string;
  features: string[];
  cta: string;
  ctaHref: string;
  highlighted?: boolean;
  badge?: string;
}

export interface MetricItem {
  value: string;
  label: string;
  source: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

// ── Pricing ──

export const factumApiTiers: PricingTier[] = [
  {
    name: "Free",
    subtitle: "Per provare",
    price: "€0",
    priceSuffix: "/mese",
    description: "Rate-limiting generoso per test e integrazione.",
    features: [
      "60 richieste/minuto",
      "Fast-path XML (41 ms)",
      "FatturaPA, PDF, F24, generico",
      "Envelope v2 con confidence score",
      "Documentazione OpenAPI",
    ],
    cta: "Ottieni chiave gratuita",
    ctaHref: "https://pyragogy.lemonsqueezy.com/checkout/buy/d616a09d-75b3-48de-b41b-d2cc19589333",
    badge: "Inizia ora",
  },
  {
    name: "Pro",
    subtitle: "Per produzione",
    price: "€29",
    priceSuffix: "/mese",
    description: "Uso professionale continuativo. Fatturabile.",
    features: [
      "300 richieste/minuto",
      "Cache documenti 30 giorni",
      "Priorità coda LLM",
      "Webhook callback (async mode)",
      "Supporto email",
    ],
    cta: "Attiva Pro",
    ctaHref: "https://pyragogy.lemonsqueezy.com/checkout/buy/d616a09d-75b3-48de-b41b-d2cc19589333",
    highlighted: true,
    badge: "Più scelto",
  },
  {
    name: "Custom",
    subtitle: "Per volumi alti",
    price: "Da €99",
    priceSuffix: "/mese",
    description: "SLA dedicato, tier personalizzato, fatturazione enterprise.",
    features: [
      "Rate limit personalizzato",
      "LLM cascade dedicata",
      "S3 bucket privato (archiviazione documenti)",
      "Sentry monitoraggio",
      "Contratto e fattura",
    ],
    cta: "Contattaci",
    ctaHref: "mailto:info@pyragogy.org",
  },
];

export const factumFicTiers: PricingTier[] = [
  {
    name: "Gratuito",
    subtitle: "Sempre gratis",
    price: "€0",
    priceSuffix: "",
    description: "Per il 90% dei forfettari italiani.",
    features: [
      "10 fatture PDF estere / mese",
      "XML FatturaPA: illimitate e gratis",
      "Elaborazione 100% locale (XML)",
      "Coda persistente SQLite",
      "Autofatture SDI automatiche",
    ],
    cta: "Installa CLI",
    ctaHref: "https://github.com/FTG-003/factum-fic",
    badge: "Sempre gratis",
  },
  {
    name: "Crediti Extra",
    subtitle: "Una tantum, mai scadono",
    price: "€9,90",
    priceSuffix: "per 100 PDF",
    description: "Per chi supera le 10 fatture estere al mese.",
    features: [
      "100 PDF aggiuntivi",
      "Nessuna scadenza",
      "Nessun abbonamento",
      "Attivazione immediata via Lemon Squeezy",
      "Accumulabili mese su mese",
    ],
    cta: "Acquista crediti",
    ctaHref: "#ricarica",
    highlighted: true,
    badge: "Più venduto",
  },
  {
    name: "Open Source",
    subtitle: "AGPL-3.0",
    price: "",
    priceSuffix: "",
    description: "Il codice è pubblico. Ognuno può controllare, modificare, migliorare.",
    features: [
      "Codice sorgente pubblico su GitHub",
      "208 test, CI verde",
      "Contribuzioni accolte",
      "Security policy attiva",
      "No vendor lock-in",
    ],
    cta: "GitHub →",
    ctaHref: "https://github.com/FTG-003/factum-fic",
  },
];

// ── Metriche chiave (dai codebase) ──

export const metrics: MetricItem[] = [
  { value: "41 ms", label: "Latenza fast-path XML", source: "backend/docstring" },
  { value: "342+", label: "Test superati (Factum API)", source: "README.md" },
  { value: "208", label: "Test superati (factum-fic CLI)", source: "README.md" },
  { value: "10", label: "PDF gratis / mese", source: "README.md" },
  { value: "0,16 ms", label: "Fast-path P50 in-process", source: "main.py" },
  { value: "80%", label: "Forfettari coperti dal free tier", source: "README.md" },
  { value: "€0", label: "Costo fast-path deterministico", source: "fastpath.py" },
  { value: "TD17/18/19", label: "Autofatture automatiche", source: "models.py" },
];

// ── Features Factum API ──

export const factumApiFeatures: FeatureItem[] = [
  {
    title: "Fast-path deterministico",
    description:
      "FatturaPA XML parsato in locale con regole deterministiche: zero LLM, zero costo, latenza 41ms. Confidence 1.0 perché non è una stima, è un fatto.",
    icon: "⚡",
  },
  {
    title: "Privacy by design (ZDR)",
    description:
      "Zero Data Retention: il sidecar Rizzo pseudonimizza i dati prima dell'LLM. Il mapping vive in RAM per-request e viene droppato. Fail-closed: sidecar giù → 503.",
    icon: "🔒",
  },
  {
    title: "LLM Cascade",
    description:
      "DeepSeek Flash (gratis) → Claude Sonnet (fallback). Routing automatico con fallback. Costo per documento sotto controllo con soglia di allarme configurabile.",
    icon: "🧠",
  },
  {
    title: "Rate limiting per tier",
    description:
      "Redis-backed: Free 60 req/min, Pro 300 req/min, Custom 1000 req/min. Fail-closed opzionale: senza Redis, niente richieste.",
    icon: "📊",
  },
  {
    title: "Envelope v2 strutturato",
    description:
      "Risposta normalizzata con schema_version, metadati (provider, prompt_version, confidence), payload strutturato con emittente, importi, dati documento, raw_extracted.",
    icon: "📦",
  },
  {
    title: "Webhook licensing",
    description:
      "Self-service via Lemon Squeezy: acquisto → webhook HMAC → provisioning automatico chiavi API. Zero intervento umano dal checkout alla prima richiesta.",
    icon: "🔄",
  },
];

// ── Features factum-fic ──

export const factumFicFeatures: FeatureItem[] = [
  {
    title: "CLI in italiano",
    description:
      "Comandi in italiano con alias: `elabora`, `stato`, `configura`, `ricarica`, `riprova-autofatture`. Zero inglese tecnico, zero curva di apprendimento.",
    icon: "🇮🇹",
  },
  {
    title: "Autofatture SDI automatiche",
    description:
      "Reverse charge gestito da solo: TD17 (extra-UE), TD18 (UE con P.IVA), TD19 (UE senza). Factum-FIC sceglie il tipo giusto in base ai dati del fornitore.",
    icon: "📄",
  },
  {
    title: "Coda persistente SQLite",
    description:
      "Ogni file ha un'impronta SHA-256. Nessuna doppia registrazione. Se qualcosa va storto, lo recuperi con un comando. Persistente tra sessioni.",
    icon: "🗄️",
  },
  {
    title: "Conversione valuta automatica",
    description:
      "Fatture in USD, GBP, CHF? Factum-FIC converte in EUR con tasso di cambio aggiornato. Modalità strict: se il tasso non è disponibile, il file non viene processato.",
    icon: "💱",
  },
  {
    title: "Watch mode",
    description:
      "Lascia Factum-FIC in esecuzione: quando trascini un PDF nella cartella, viene elaborato in automatico. Zero click, zero comandi.",
    icon: "👁️",
  },
  {
    title: "Trasparenza totale",
    description:
      "Codice AGPL-3.0 pubblico. 208 test. I dati XML non escono mai dal tuo computer. I PDF vengono inviati solo come testo estratto, mai il file originale.",
    icon: "🔍",
  },
];