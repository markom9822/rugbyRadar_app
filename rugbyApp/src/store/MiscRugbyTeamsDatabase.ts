import { DefaultLogo } from "./InternationalTeamLogos/InternationalTeams"
import { BlackLionAltLogo, BlackLionLogo, CheetahsAltLogo, CheetahsLogo } from "./MiscTeamLogos/MiscTeams"


export const getMiscTeamInfoFromName = (name: string) => {

  const defaultTeam =  {
    type: 'Misc Club',
    displayName: 'Default',
    abbreviation: 'DEF',
    logo: DefaultLogo,
    altLogo: DefaultLogo,
    colour: '#000000',
    id: '0',
    defaultLeague: '',
    foundedYear: '',
    seasonType: '',
  }

  // remove not needed parts of name
  const searchName = name.replace(" Rugby", "")

    const match = MiscRugbyTeams.find((item) => item.displayName === searchName)
    if(match !== undefined)
    {
        return match
    }
    else
    {
        return defaultTeam
    }
}


export const MiscRugbyTeams = [
  {
    type: 'Misc Club',
    displayName: 'Toyota Cheetahs',
    abbreviation: 'CHEET',
    logo: CheetahsLogo,
    altLogo: CheetahsAltLogo,
    colour: '#E89719',
    id: '',
    defaultLeague: '',
    foundedYear: '1895',
    seasonType: 'north',
  },
  {
    type: 'Misc Club',
    displayName: 'Black Lion',
    abbreviation: 'BLA',
    logo: BlackLionLogo,
    altLogo: BlackLionAltLogo,
    colour: '#e3d646',
    id: '',
    defaultLeague: '',
    foundedYear: '2021',
    seasonType: 'north',
  },

];