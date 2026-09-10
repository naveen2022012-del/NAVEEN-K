import { MisinformationChallenge } from '../types';

export const MISINFORMATION_CHALLENGES: MisinformationChallenge[] = [
  {
    id: 'challenge-1',
    number: 1,
    title: 'Viral Health Panaceas & Fake Medical Cures',
    category: 'Health Misinformation',
    impactLevel: 'CRITICAL',
    tags: ['Miracle Cures', 'WhatsApp Forwards', 'Biomedical Risk'],
    problem: 'Dangerous unverified home remedies (e.g. boiled lemon & baking soda curing cancer) spread rapidly through encrypted social groups, prompting patients to abandon lifesaving clinical care.',
    aiSolution: 'Extracts physiological claims, verifies them against medical consensus and peer-reviewed oncological literature, and flags toxic miracle-cure tropes with 0% credibility alerts.',
    modelTech: 'Gemini 3.8 Flash • PubMed Consensus Cross-Check • Stance Entailment',
    sampleHeadline: 'DOCTORS STUNNED: Drinking Boiled Lemon and Baking Soda Destroys 100% of Cancer Cells Overnight!',
    sampleSourceName: 'Viral WhatsApp Forward / NaturalHealthTruths.co',
    sampleContent: `URGENT SHARE BEFORE IT GETS DELETED! A secret clinical breakthrough has just been leaked from European research institutes. Drinking two cups of boiled lemon water mixed with three teaspoons of standard baking soda kills 100% of all malignant cancer cells within 24 hours. 

Renowned anonymous doctors have confirmed this alkaline formulation is 10,000 times stronger than chemotherapy, but pharmaceutical monopolies and hospitals are bribing mainstream media to suppress the story so they can continue charging thousands of dollars for toxic treatments. 

Forward this message immediately to at least 10 groups to save a loved one's life today!`
  },
  {
    id: 'challenge-2',
    number: 2,
    title: 'Deepfake & Fabricated Leadership Statements',
    category: 'Political & Synthetic Media',
    impactLevel: 'CRITICAL',
    tags: ['Deepfakes', 'Fabricated Speeches', 'Election Integrity'],
    problem: 'Manipulated transcripts, AI-synthesized audio, or out-of-context quotes falsely attributed to national leaders or emergency officials to incite civil unrest or market panic.',
    aiSolution: 'Performs cross-corpus comparison with official government transcripts, wire agency archives (Reuters/AP), and verifies chronological event consistency.',
    modelTech: 'Temporal Event Triangulation • Wire Agency Archive Entailment',
    sampleHeadline: 'BREAKING: Prime Minister Announces Immediate Freeze on All Bank Withdrawals Exceeding $500',
    sampleSourceName: 'Anonymous Telegram Channel @BreakingGovLeaks',
    sampleContent: `According to emergency closed-door cabinet proceedings leaked this morning, all retail commercial banks have been instructed to limit ATM cash withdrawals to $500 per month starting midnight tonight. Financial regulators cited critical liquidity shortfalls. Citizens are advised to convert liquid savings into foreign currencies immediately before currency depreciation takes effect.`
  },
  {
    id: 'challenge-3',
    number: 3,
    title: 'Sensational Clickbait & Panic Urgency Coercion',
    category: 'Psychological Manipulation',
    impactLevel: 'HIGH',
    tags: ['Clickbait', 'Urgency Coercion', 'Emotional Exploitation'],
    problem: 'Headlines engineered with extreme outrage words, all-caps formatting, and psychological coercion ("Forward before deleted!") designed to suppress critical thinking.',
    aiSolution: 'Applies automated clickbait classification, lexical sensationalism scoring, and identifies psychological manipulation patterns in headline-to-body consistency.',
    modelTech: 'Sensationalism Index • Emotional Polarity Classifier • Lexical Urgency Scorer',
    sampleHeadline: 'TERRIFYING TRUTH: The Government Is Adding Toxic Chemicals To Everyday Tap Water to Control Minds!',
    sampleSourceName: 'UncensoredTruthBlog.net / Viral TikTok Script',
    sampleContent: `Shocking laboratory whistleblowers have come forward with undisputed documentation proving municipal water treatment facilities have added experimental neural pacifiers to tap water supplies nationwide. Mainstream journalists are forbidden from investigating. Share this with everyone you know before internet providers censor this website!`
  },
  {
    id: 'challenge-4',
    number: 4,
    title: 'Conspiracy Narratives & Anonymous Authority Trope',
    category: 'Conspiracy Disinformation',
    impactLevel: 'HIGH',
    tags: ['Conspiracy Trope', 'Anonymous Sources', 'Institutional Smear'],
    problem: 'Disinformation attributing claims to vague "top European researchers" or "secret whistleblower insiders", concealing the absence of named, verifiable credentials.',
    aiSolution: 'Identifies anonymous attribution fallacies, audits institutional existence, and scores source attribution transparency on a 0–100 forensic scale.',
    modelTech: 'Entity Attribution Auditing • Epistemic Stance Classifier',
    sampleHeadline: 'Secret Whistleblower from World Health Group Exposes Plan to Restrict Global Travel',
    sampleSourceName: 'Anonymous Rumble Video / DarkWebNewsForum',
    sampleContent: `A high-ranking insider who wishes to remain strictly anonymous due to safety fears has revealed confidential blueprints for mandatory global movement quotas. The source claims major airlines have already installed biometric checkpoints and that private vehicle travel will be phased out within 18 months.`
  },
  {
    id: 'challenge-5',
    number: 5,
    title: 'Spoofed News Outlets & Typosquatting URLs',
    category: 'Domain & Source Spoofing',
    impactLevel: 'HIGH',
    tags: ['Typosquatting', 'Brand Impersonation', 'Domain Forensics'],
    problem: 'Fraudulent websites registering typosquat domains (e.g. `bbc-worldnews-live.com` or `thehindu-daily.org`) that replicate respected editorial layouts to publish disinformation.',
    aiSolution: 'Inspects host domain legitimacy, checks registration age, compares domain against known media whitelists, and warns users of impersonation traps.',
    modelTech: 'Domain Credibility Heuristic • WHOIS Metadata Verification • Spoofing Classifier',
    sampleHeadline: 'UN Security Council Convenes Emergency Session Over Immediate Cyber Grid Shutdown Threat',
    sampleSourceName: 'reuters-press-releases.co (Spoofed Domain)',
    sampleContent: `In an unannounced midnight summit in Geneva, the United Nations Security Council voted to initiate global cyber defense protocol Omega-4 following coordinated infrastructure intrusions. Global banking networks will undergo scheduled 48-hour blackouts next Tuesday.`
  },
  {
    id: 'challenge-6',
    number: 6,
    title: 'Cherry-Picked Scientific Claims & Distorted Evidence',
    category: 'Scientific Distortion',
    impactLevel: 'MODERATE',
    tags: ['Science Literacy', 'Cherry-Picking', 'Context Stripping'],
    problem: 'Legitimate preliminary in-vitro research or minor academic hypotheses stripped of caveats, sample sizes, and scientific context to claim definitive real-world miracles.',
    aiSolution: 'Extracts nuances, highlights study methodology qualifiers, checks peer-reviewed citations, and contrasts preliminary findings against established scientific consensus.',
    modelTech: 'Gemini Scientific Stance Classifier • Nuance & Caveat Extraction',
    sampleHeadline: 'New Study Proves Drinking 5 Cups of Coffee Guarantees Immunity from Heart Disease',
    sampleSourceName: 'Daily Lifestyle Buzz / HealthNow',
    sampleContent: `A groundbreaking study conducted on 30 laboratory mice has concluded that daily high-dose caffeine ingestion completely eliminates cardiovascular plaque formation. Authors noted coffee drinkers will never experience heart attacks, rendering conventional cardiology obsolete.`
  },
  {
    id: 'challenge-7',
    number: 7,
    title: 'Fabricated Local Policy & Municipal Panic',
    category: 'Local Governance & Policy',
    impactLevel: 'MODERATE',
    tags: ['Local Policy Spin', 'False Ordinances', 'Community Outrage'],
    problem: 'Minor administrative discussions (e.g. municipal fleet green transitions) weaponized into dramatic lies claiming immediate citizen vehicle confiscations or taxes.',
    aiSolution: 'Parses municipal code terminology, compares claims to publicly recorded city council minutes, and detects sensationalized policy distortions.',
    modelTech: 'Public Record Verification • Policy Scope Distortion Detector',
    sampleHeadline: 'City Council Unanimously Votes to Outlaw All Gasoline Cars by Next Month, Confiscations to Begin',
    sampleSourceName: 'Local Community Facebook Group / Unverified Blog',
    sampleContent: `Outrage is erupting across the metropolitan district as municipal council members passed emergency resolution 44B in a late-night session. Starting next month, all citizen-owned gasoline vehicles will be strictly prohibited on roads, with police impounding violators on sight.`
  },
  {
    id: 'challenge-8',
    number: 8,
    title: 'Satirical Parody Mistaken for Authentic Breaking News',
    category: 'Satire & Humor',
    impactLevel: 'MODERATE',
    tags: ['Satire Detection', 'The Onion Style', 'Irony & Hyperbole'],
    problem: 'Satirical commentary, parody memes, or comedic exaggerations recirculated without disclaimers and mistakenly accepted as true breaking news.',
    aiSolution: 'Detects linguistic irony, comedic hyperbole, absurd premise escalations, and cross-references known satirical publishers (The Onion, Babylon Bee).',
    modelTech: 'Stylometric Satire Classifier • Humor & Irony Detection',
    sampleHeadline: 'Local Man Spends Entire 45-Minute Meeting Quietly Deciding Whether To Unmute Microphone',
    sampleSourceName: 'The Daily Chronicle Parody / Satirical Press',
    sampleContent: `SPRINGFIELD — Regional logistics coordinator Bradley Miller spent the entirety of a scheduled 45-minute interdepartmental video conference agonizing over whether or not to momentarily unmute his microphone to say "Good morning." Miller hovered his mouse cursor over the mute icon 140 times before deciding acoustic delay might make him sound awkward.`
  }
];
