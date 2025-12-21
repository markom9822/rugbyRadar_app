export type TeamPlayer = {
  knownName: string | null;
  firstName: string | null;
  lastName: string | null;
  // ...other fields
};

export type PlayerMatchResult = {
  index: number;          // -1 if no match
  player: TeamPlayer | null;
};

const normalize = (s: string | null | undefined): string =>
  (s ?? '').trim().toLowerCase();

const similarity = (a: string, b: string): number => {
  a = normalize(a);
  b = normalize(b);
  if (!a || !b) return 0;
  
  // Split into words for name matching
  const wordsA = a.split(/\s+/);
  const wordsB = b.split(/\s+/);
  
  if (wordsA.length === 0 || wordsB.length === 0) return 0;
  
  // Compare last names (most important)
  const lastA = wordsA[wordsA.length - 1];
  const lastB = wordsB[wordsB.length - 1];
  const lastMatch = lastA === lastB ? 1.0 : 0.0;
  
  // Compare first names
  const firstA = wordsA[0];
  const firstB = wordsB[0];
  const minLen = Math.min(firstA.length, firstB.length);
  let firstMatches = 0;
  for (let i = 0; i < minLen; i++) {
    if (firstA[i] === firstB[i]) firstMatches++;
  }
  const firstMatch = firstMatches / Math.max(firstA.length, firstB.length, 1);
  
  return (lastMatch * 0.7) + (firstMatch * 0.3);
};

export const findBestPlayerMatch = (
  targetFullName: string,
  players: TeamPlayer[]
): PlayerMatchResult => {
  const targetFull = normalize(targetFullName);
  const targetParts = targetFull.split(/\s+/);
  const targetFirst = targetParts[0] ?? '';
  const targetLast = targetParts[targetParts.length - 1] ?? '';

  if (!targetLast) {
    return { index: -1, player: null };
  }

  // 1. Indices of candidates with matching lastName
  const candidateIndices = players
    .map((p, idx) => ({ p, idx }))
    .filter(({ p }) => normalize(p.lastName) === targetLast);

  console.info(candidateIndices)

  if (candidateIndices.length === 0) {
    return { index: -1, player: null };
  }

  const resultFromIndex = (idx: number): PlayerMatchResult =>
    idx === -1 ? { index: -1, player: null } : { index: idx, player: players[idx] };

  // helper to get index from candidateIndices
  const idxFrom = (predicate: (p: TeamPlayer) => boolean): number => {
    const found = candidateIndices.find(({ p }) => predicate(p));
    return found ? found.idx : -1;
  };

  // 2. Exact knownName
  let index = idxFrom((p) => normalize(p.knownName) === targetFull);
  if (index !== -1) return resultFromIndex(index);

  // 3. Exact firstName + lastName
  index = idxFrom(
    (p) =>
      normalize(p.firstName) === targetFirst &&
      normalize(p.lastName) === targetLast
  );
  if (index !== -1) return resultFromIndex(index);

  // 4. First initial + lastName
  const firstInitial = targetFirst[0];
  if (firstInitial) {
    index = idxFrom((p) => normalize(p.firstName).startsWith(firstInitial));
    if (index !== -1) return resultFromIndex(index);
  }

  // NEW: 5. Fuzzy knownName matching (catches "Eneriko" vs "Riko Buliruarua")
  const knownFuzzyThreshold = 0.6;
  for (const { p, idx } of candidateIndices) {

    if(p.knownName)
    {
        console.info(p.knownName)
        console.info(targetFull)
        console.info(similarity(p.knownName, targetFull))
    }
    

    if (p.knownName && similarity(p.knownName, targetFull) >= knownFuzzyThreshold) {
      return resultFromIndex(idx);
    }
  }

  // 6. Fuzzy first-name similarity within same lastName
  const THRESHOLD = 0.6;
  let bestIndex = -1;
  let bestScore = 0;

  for (const { p, idx } of candidateIndices) {
    const score = similarity(p.firstName ?? '', targetFirst);
    if (score > bestScore && score >= THRESHOLD) {

      console.info(`Best Score: ${bestScore}`)
      bestScore = score;
      bestIndex = idx;
    }
  }

  return resultFromIndex(bestIndex);
};
