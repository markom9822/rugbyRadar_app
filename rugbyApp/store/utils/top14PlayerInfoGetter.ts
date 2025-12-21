

const makePlayersUrl = (competitionId: number, teamID: string | undefined) =>
  `https://rugby-union-feeds.incrowdsports.com/v1/teams/${teamID}/players?provider=rugbyviz&competitionId=${competitionId}&seasonId=202501&images=true`;

export const getTop14TeamPlayersInfo = async (teamID: string | undefined) => {
  const competitionIds = [1008, 1026];

  for (const competitionId of competitionIds) {
    const url = makePlayersUrl(competitionId, teamID);
    console.info("Trying:", url);

    try {
      const res = await fetch(url);
      if (!res.ok) {
        continue;
      }

      const data = await res.json();

      // Optional: if API always returns 200 but with empty data when invalid:
      if (!data || (Array.isArray(data) && data.length === 0)) {
        continue;
      }

      // Success path – use this one
      return { competitionId, data };

    } catch (e) {
      console.error("Error for comp", competitionId, e);
    }
  }

  throw new Error("No competitionId returned usable data");
};