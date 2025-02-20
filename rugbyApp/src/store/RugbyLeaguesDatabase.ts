import { BALionsAltLogo, BALionsLogo } from "./InternationalTeamLogos/InternationalTeams";
import { AutumnNationsAltLogo, AutumnNationsLogo, ChallengeCupAltLogo, ChallengeCupLogo, ChampionsCupAltLogo, PremiershipAltLogo, RugbyChampAltLogo, RugbyChampLogo, SixNationsAltLogo, SixNationsLogo, SuperRugbyAltLogo, SuperRugbyLogo, Top14AltLogo, Top14Logo, U20SixNationsAltLogo, U20SixNationsLogo, U20WorldChampsAltLogo, U20WorldChampsLogo, URCAltLogo, URCLogo, WorldCupAltLogo, WorldCupLogo } from "./LeagueLogos/LeagueLogos";

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
    id: '#00cde6',
    foundedYear: '-',
    seasonType: 'north',
  },
  {
    value: 'prem',
    displayName: 'Gallagher Premiership',
    abbreviation: 'Premiership',
    logo: PremiershipAltLogo,
    altLogo: PremiershipAltLogo,
    colour: '#51528c',
    id: '1011',
    foundedYear: '-',
    seasonType: 'north',
  },
  {
    value: 'championsCup',
    displayName: 'Investec Champions Cup',
    abbreviation: 'Champions Cup',
    logo: ChampionsCupAltLogo,
    altLogo: ChampionsCupAltLogo,
    colour: '#000038',
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
    colour: '#d1fa00',
    id: '1026',
    foundedYear: '-',
    seasonType: 'north',
  },
  {
    value: 'top14',
    displayName: 'Top 14',
    abbreviation: 'Top 14',
    logo: Top14Logo,
    altLogo: Top14AltLogo,
    colour: '#d2ab44',
    id: '1310036262',
    foundedYear: '-',
    seasonType: 'north',
  },
  {
    value: 'superRugby',
    displayName: 'Super Rugby Pacific',
    abbreviation: 'Super Rugby',
    logo: SuperRugbyLogo,
    altLogo: SuperRugbyAltLogo,
    colour: '#09b5b5',
    id: '1310032187',
    foundedYear: '-',
    seasonType: 'south',
  },
  {
    value: 'sixNations',
    displayName: 'Six Nations',
    abbreviation: 'Six Nations',
    logo: SixNationsLogo,
    altLogo: SixNationsAltLogo,
    colour: '#f79518',
    id: '2171',
    foundedYear: '-',
    seasonType: 'north',
  },
  {
    value: 'u20SixNations',
    displayName: 'U20 Six Nations',
    abbreviation: 'U20 Six Nations',
    logo: U20SixNationsLogo,
    altLogo: U20SixNationsAltLogo,
    colour: '#d4f417',
    id: 'dbb6df44-d64a-4726-a1b8-839c0cc1ff41',
    foundedYear: '-',
    seasonType: 'north',
  },
  {
    value: 'rugbyChamp',
    displayName: 'The Rugby Championship',
    abbreviation: 'Rugby Championship',
    logo: RugbyChampLogo,
    altLogo: RugbyChampAltLogo,
    colour: '#376c90',
    id: 'a8ed1f3e-a2f3-4400-9f3a-9fc002356b3c',
    foundedYear: '-',
    seasonType: 'south',
  },
  {
    value: 'rugbyWorldCup',
    displayName: 'Rugby World Cup',
    abbreviation: 'Rugby World Cup',
    logo: WorldCupLogo,
    altLogo: WorldCupAltLogo,
    colour: '#7ffc58',
    id: '1893',
    foundedYear: '-',
    seasonType: 'north',
  },
  {
    value: 'u20Championship',
    displayName: 'World Rugby U20 Championship',
    abbreviation: 'U20 Championship',
    logo: U20WorldChampsLogo,
    altLogo: U20WorldChampsAltLogo,
    colour: '#35498d',
    id: '560edcbf-fd99-4a11-b7b5-0a5e017d61f2',
    foundedYear: '-',
    seasonType: 'north',
  },
  {
    value: 'autumnNations',
    displayName: 'Autumn Nations Series',
    abbreviation: 'Autumn Nations',
    logo: AutumnNationsLogo,
    altLogo: AutumnNationsAltLogo,
    colour: '#ed36b4',
    id: 'c805a102-6cbe-4eed-a158-f5878cf1f162',
    foundedYear: '-',
    seasonType: 'north',
  },
  {
    value: 'BILTour',
    displayName: "British & Irish Lion's Tour",
    abbreviation: "Lion's Tour",
    logo: BALionsLogo,
    altLogo: BALionsAltLogo,
    colour: '#b40119',
    id: '2c9549f5-0e9a-4bcb-9d05-074ef161b7be',
    foundedYear: '-',
    seasonType: 'north',
  }
];