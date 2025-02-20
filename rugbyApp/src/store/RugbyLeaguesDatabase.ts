import { ChallengeCupAltLogo, ChallengeCupLogo, ChampionsCupAltLogo, ChampionsCupLogo, PremiershipAltLogo, PremiershipLogo, URCAltLogo, URCLogo } from "./LeagueLogos/LeagueLogos";

export const getRugbyLeagueTeamInfoFromValue = (name: string) => {

    const match = RugbyLeagues.find((item) => item.value === name)
    if(match !== undefined)
    {
        return match
    }
    else
    {
        return null
    }
}


export const RugbyLeagues = [
  {
    value: 'urc',
    displayName: 'United Rugby Championship',
    abbreviation: 'URC',
    logo: URCLogo,
    altLogo: URCAltLogo,
    colour: '#003287',
    id: '1068',
    foundedYear: '-',
    seasonType: 'north',
  },
  {
    value: 'prem',
    displayName: 'Gallagher Premiership',
    abbreviation: 'Premiership',
    logo: PremiershipLogo,
    altLogo: PremiershipAltLogo,
    colour: '#033287',
    id: '1011',
    foundedYear: '-',
    seasonType: 'north',
  },
  {
    value: 'championsCup',
    displayName: 'Investec Champions Cup',
    abbreviation: 'Champions Cup',
    logo: ChampionsCupLogo,
    altLogo: ChampionsCupAltLogo,
    colour: '#033287',
    id: '1008',
    foundedYear: '-',
    seasonType: 'north',
  },
  {
    value: 'challengeCup',
    displayName: 'European Challenge Cup',
    abbreviation: 'Challenge Cup',
    logo: ChallengeCupLogo,
    altLogo: ChallengeCupAltLogo,
    colour: '#033287',
    id: '1026',
    foundedYear: '-',
    seasonType: 'north',
  }
];