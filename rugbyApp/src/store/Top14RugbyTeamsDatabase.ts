import { DefaultLogo } from "./InternationalTeamLogos/InternationalTeams";
import { BayonneLogo, BordeauxLogo, BriveLogo, CastresLogo, ClermontLogo, LaRochelleLogo, LyonLogo, MontpellierLogo, PauLogo, PerpignanLogo, Racing92Logo, StadeFrancaisLogo, ToulonLogo, ToulouseLogo, VannesLogo } from "./Top14TeamLogos/Top14Teams";

export const getTop14TeamInfoFromName = (name: string) => {

  const defaultTeam =  {
    type: 'Top14 Club',
    displayName: 'Default',
    abbreviation: 'DEF',
    logo: DefaultLogo,
    colour: '#00845c',
  }
    const match = Top14RugbyTeams.find((item) => item.displayName === name)
    if(match !== undefined)
    {
        return match
    }
    else
    {
        return defaultTeam
    }
}


export const Top14RugbyTeams = [
  {
    type: 'Top14 Club',
    displayName: 'Bayonne',
    abbreviation: 'BAY',
    logo: BayonneLogo,
    colour: '#',
  },
  {
    type: 'Top14 Club',
    displayName: 'Bordeaux Begles',
    abbreviation: 'BEG',
    logo: BordeauxLogo,
    colour: '#',
  },
  {
    type: 'Top14 Club',
    displayName: 'Brive',
    abbreviation: 'BRIVE',
    logo: BriveLogo,
    colour: '#',
  },
  {
    type: 'Top14 Club',
    displayName: 'Castres Olympique',
    abbreviation: 'CAS',
    logo: CastresLogo,
    colour: '#',
  },
  {
    type: 'Top14 Club',
    displayName: 'Clermont Auvergne',
    abbreviation: 'CLER',
    logo: ClermontLogo,
    colour: '#',
  },
  {
    type: 'Top14 Club',
    displayName: 'La Rochelle',
    abbreviation: 'LA RO',
    logo: LaRochelleLogo,
    colour: '#',
  },
  {
    type: 'Top14 Club',
    displayName: 'Lyon',
    abbreviation: 'LYON',
    logo: LyonLogo,
    colour: '#',
  },
  {
    type: 'Top14 Club',
    displayName: 'Montpellier Herault',
    abbreviation: 'MONTP',
    logo: MontpellierLogo,
    colour: '#',
  },
  {
    type: 'Top14 Club',
    displayName: 'Vannes',
    abbreviation: 'VANN',
    logo: VannesLogo,
    colour: '#',
  },
  {
    type: 'Top14 Club',
    displayName: 'Pau',
    abbreviation: 'PAU',
    logo: PauLogo,
    colour: '#',
  },
  {
    type: 'Top14 Club',
    displayName: 'Perpignan',
    abbreviation: 'PERP',
    logo: PerpignanLogo,
    colour: '#',
  },
  {
    type: 'Top14 Club',
    displayName: 'Racing 92',
    abbreviation: 'RAMET',
    logo: Racing92Logo,
    colour: '#',
  },
  {
    type: 'Top14 Club',
    displayName: 'Stade Francais Paris',
    abbreviation: 'SFRAN',
    logo: StadeFrancaisLogo,
    colour: '#',
  },
  {
    type: 'Top14 Club',
    displayName: 'Toulon',
    abbreviation: 'TOUL',
    logo: ToulonLogo,
    colour: '#',
  },
  {
    type: 'Top14 Club',
    displayName: 'Stade Toulousain',
    abbreviation: 'TOUL',
    logo: ToulouseLogo,
    colour: '#',
  },
  
];