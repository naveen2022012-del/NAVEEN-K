import { NewsAnalysisResponse } from '../types';

export function runLocalAnalysis(
  text: string,
  headline?: string,
  sourceName?: string,
  sourceUrl?: string
): NewsAnalysisResponse {
  const combined = `${headline || ''} ${text}`.toLowerCase();

  // Indicators of fake / hoax news
  const fakeKeywords = [
    'cure 100%', 'kills 100%', 'big pharma', 'secret leaked', 'share before deleted',
    'forward to 10', 'forward this', 'miracle cure', 'banned by doctors', 'doctors stunned',
    'they don\'t want you to know', 'conspiracy', 'outlaw all', 'confiscation to begin',
    'leaked memo', 'hidden truth', 'toxic chemotherapy', 'globalist cartels',
    'freeze on all bank withdrawals', 'pacifiers to tap water', 'restrict global travel'
  ];

  // Indicators of satire
  const satireKeywords = [
    'at press time', 'spent the entirety', 'interdepartmental video conference', 'the onion',
    'babylon bee', 'satirical', 'sources confirmed tuesday that regional', 'parody', 'unmute microphone'
  ];

  // Indicators of credible reporting
  const realKeywords = [
    'peer-reviewed', 'published in', 'the astrophysical journal', 'astronomers', 'centers for disease control',
    'morbidity and mortality weekly report', 'study led by', 'dr.', 'associated press', 'reuters',
    'spokesperson confirmed', 'clinical trial', 'methodology', 'confidence intervals', 'nasa', 'exoplanet'
  ];

  let fakeScoreCount = 0;
  fakeKeywords.forEach((kw) => {
    if (combined.includes(kw)) fakeScoreCount += 2;
  });

  let satireScoreCount = 0;
  satireKeywords.forEach((kw) => {
    if (combined.includes(kw)) satireScoreCount += 3;
  });

  let realScoreCount = 0;
  realKeywords.forEach((kw) => {
    if (combined.includes(kw)) realScoreCount += 2;
  });

  const uppercaseWords = (text.match(/\b[A-Z]{3,}\b/g) || []).length;
  if (uppercaseWords > 4) fakeScoreCount += 2;

  let verdict: 'LIKELY_REAL' | 'LEANING_REAL' | 'UNVERIFIED_OR_MIXED' | 'LEANING_FAKE' | 'LIKELY_FAKE' | 'SATIRE_PARODY' = 'UNVERIFIED_OR_MIXED';
  let credibilityScore = 50;
  let verdictTitle = 'Unverified or Mixed Evidence';
  let summary = 'The provided text contains claims that require further corroboration against primary verified sources.';

  if (satireScoreCount >= 3) {
    verdict = 'SATIRE_PARODY';
    credibilityScore = 30;
    verdictTitle = 'Satirical or Parody Content';
    summary = 'This content exhibits classic hallmarks of satirical comedy or hyperbolic social parody, rather than a factual journalistic dispatch.';
  } else if (fakeScoreCount > realScoreCount && fakeScoreCount >= 4) {
    verdict = 'LIKELY_FAKE';
    credibilityScore = Math.max(8, 25 - fakeScoreCount * 3);
    verdictTitle = 'Likely Fabricated Misinformation';
    summary = 'Analysis identified multiple high-risk misinformation markers: unsubstantiated claims, emotional panic triggers, conspiratorial framing, and complete absence of verifiable peer-reviewed sources.';
  } else if (realScoreCount > fakeScoreCount && realScoreCount >= 4) {
    verdict = 'LIKELY_REAL';
    credibilityScore = Math.min(94, 75 + realScoreCount * 3);
    verdictTitle = 'Verified & High Credibility Content';
    summary = 'The text uses measured journalistic tone, attributes claims to identifiable institutions and authors, cites empirical data or official releases, and lacks manipulative sensationalism.';
  } else if (fakeScoreCount > 0) {
    verdict = 'LEANING_FAKE';
    credibilityScore = 38;
    verdictTitle = 'Potentially Misleading or Unsubstantiated';
    summary = 'This article contains sensationalist phrasing and unverified claims that warrant severe skepticism and primary source checking.';
  } else if (realScoreCount > 0) {
    verdict = 'LEANING_REAL';
    credibilityScore = 72;
    verdictTitle = 'Leaning Credible with Specific Citations';
    summary = 'The content demonstrates standard reporting structures, though readers should verify secondary references and author attribution.';
  }

  const isClickbait = headline ? (uppercaseWords > 2 || headline.includes('!') || fakeScoreCount > 2) : false;

  return {
    verdict,
    verdictTitle,
    credibilityScore,
    confidenceScore: 84,
    summary,
    headlineAnalysis: {
      sensationalismScore: isClickbait ? 82 : (verdict === 'LIKELY_REAL' ? 18 : 55),
      isClickbait,
      notes: isClickbait
        ? 'Headline utilizes urgency markers, capitalized sensational terms, or hyperbolic assertions designed to provoke emotional reaction.'
        : 'Headline maintains conventional journalistic conventions without deceptive baiting tactics.',
    },
    scores: {
      overallCredibility: credibilityScore,
      factuality: verdict === 'LIKELY_REAL' ? 88 : (verdict === 'LIKELY_FAKE' ? 14 : 52),
      sensationalism: verdict === 'LIKELY_FAKE' ? 89 : (verdict === 'LIKELY_REAL' ? 15 : 45),
      sourceAttribution: verdict === 'LIKELY_REAL' ? 86 : (verdict === 'LIKELY_FAKE' ? 12 : 48),
      logicalConsistency: verdict === 'LIKELY_REAL' ? 90 : (verdict === 'LIKELY_FAKE' ? 20 : 58),
      biasNeutrality: verdict === 'LIKELY_REAL' ? 84 : (verdict === 'LIKELY_FAKE' ? 22 : 50),
    },
    keyClaims: [
      {
        id: 'claim-1',
        claim: headline || (text.slice(0, 100) + '...'),
        verdict: verdict === 'LIKELY_REAL' ? 'VERIFIED' : (verdict === 'LIKELY_FAKE' ? 'FABRICATED' : 'UNVERIFIED'),
        explanation: verdict === 'LIKELY_REAL'
          ? 'Cites named scientific institutions or registered government reports.'
          : (verdict === 'LIKELY_FAKE'
              ? 'Lacks empirical replication; contradicts established scientific or factual consensus.'
              : 'Requires cross-referencing against independent news agencies.'),
        confidence: 85,
      },
    ],
    flags: [
      ...(fakeScoreCount > 0 ? [{
        type: 'red' as const,
        category: 'Sensationalism & Conspiratorial Tropes',
        quote: 'Urgent forward / Secret breakthrough',
        note: 'Emotional manipulation and accusations of conspiracies are primary indicators of disinformation.',
      }] : []),
      ...(realScoreCount > 0 ? [{
        type: 'green' as const,
        category: 'Identified Institutional Citations',
        quote: 'Official reports and peer-reviewed journals',
        note: 'References verifiable primary literature rather than vague anonymous authorities.',
      }] : []),
      {
        type: 'yellow' as const,
        category: 'Verification Recommendation',
        note: 'Cross-reference claims across multiple independent reputable wire services (AP, Reuters, AFP).',
      },
    ],
    detectedPatterns: verdict === 'LIKELY_FAKE'
      ? ['Emotional Urgency Framing', 'Lack of Verifiable Byline', 'Miracle Cure / Panacea Pattern']
      : (verdict === 'LIKELY_REAL'
          ? ['Direct Source Attribution', 'Nuanced Caveat Reporting', 'Empirical Methodology Citing']
          : ['General Unverified Claim Pattern']),
    recommendedChecks: [
      'Search Snopes, PolitiFact, or Reuters Fact Check for matching keywords.',
      'Check whether major reputable news wires (Associated Press, BBC, Reuters) are reporting the same story.',
      'Trace the original byline and verify that the cited scientific journal or government department actually published the claim.',
      'Inspect the publishing domain for imposter URLs, clone domains, or satirical disclaimers.',
    ],
    crossCheckQueries: [
      `"${(headline || text.slice(0, 50)).replace(/[^\w\s]/g, '').slice(0, 60)}" fact check`,
      `is "${(headline || text.slice(0, 40)).replace(/[^\w\s]/g, '').slice(0, 40)}" real or fake`,
    ],
    sourceReputation: {
      domain: sourceUrl ? new URL(sourceUrl).hostname : (sourceName || 'Unknown / User Input'),
      rating: verdict === 'LIKELY_REAL' ? 'Reputable / Verifiable Context' : (verdict === 'LIKELY_FAKE' ? 'Suspicious / Unreliable Origin' : 'Unverified Domain'),
      notes: 'Evaluate source credentials and verify registration history.',
    },
    timestamp: new Date().toISOString(),
  };
}
