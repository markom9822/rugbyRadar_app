import { DefaultLogo } from "./InternationalTeamLogos/InternationalTeams"
import { BluesLogo, BrumbiesLogo, ChiefsLogo, CrusadersLogo, DruaLogo, ForceLogo, HighlandersLogo, HurricanesLogo, MoanaLogo, RebelsLogo, RedsLogo, WaratahsLogo } from "./SuperRugbyTeamLogos/SuperRugbyTeams"

export const getSuperRugbyTeamInfoFromName = (name: string) => {

    const defaultTeam =  {
      type: 'Super Rugby Club',
      displayName: 'Default',
      abbreviation: 'DEF',
      logo: DefaultLogo,
      colour: '#00845c',
      id: '0',
      defaultLeague: '',
      foundedYear: '',
      textInfo: ''
    }
  
      const match = SuperRugbyTeams.find((item) => item.displayName === name)
      if(match !== undefined)
      {
          return match
      }
      else
      {
          return defaultTeam
      }
}

export const SuperRugbyTeams = [
    {
        type: 'Super Rugby Club',
        displayName: 'Hurricanes',
        abbreviation: 'HURRI',
        logo: HurricanesLogo,
        colour: '#fede00',
        id: '25939',
        defaultLeague: 'Super Rugby Pacific',
        foundedYear: '1996',
        textInfo: "The Hurricanes (formerly the Wellington Hurricanes) is a New Zealand professional men's rugby union team based in Wellington. " +
        "The Hurricanes were formed to represent the lower North Island, including the East Coast, Hawke's Bay, Horowhenua Kapiti, Manawatū," +
        " Poverty Bay, Taranaki, Wairarapa-Bush, Wanganui and Wellington unions. " +
        "The Hurricanes were formed in 1996 as one of five New Zealand Super 12 teams."
    },
    {
        type: 'Super Rugby Club',
        displayName: 'Blues',
        abbreviation: 'BLUES',
        logo: BluesLogo,
        colour: '#1f3bc4',
        id: '25932',
        defaultLeague: 'Super Rugby Pacific',
        foundedYear: '1996',
        textInfo: "The Blues (known as the Auckland Blues from 1996 to 1999) are a New Zealand professional rugby union team based in Auckland. " +
        "Like New Zealand's four other Super Rugby teams, the Blues were established by the NZRU in 1996. "
    },
    {
        type: 'Super Rugby Club',
        displayName: 'Brumbies',
        abbreviation: 'BRUMB',
        logo: BrumbiesLogo,
        colour: '#002B54',
        id: '25889',
        defaultLeague: 'Super Rugby Pacific',
        foundedYear: '1995',
        textInfo: "The ACT Brumbies (known from 2005 to 2022 as simply the Brumbies) is an Australian professional rugby union team based in Canberra, " +
        "Australian Capital Territory (ACT). " +
        "The Brumbies were formed in 1996 to provide a third Australian franchise. " +
        "The Brumbies play in navy blue, white and gold kits."
    },
    {
        type: 'Super Rugby Club',
        displayName: 'Chiefs',
        abbreviation: 'CHIEF',
        logo: ChiefsLogo,
        colour: '#f03737',
        id: '25934',
        defaultLeague: 'Super Rugby Pacific',
        foundedYear: '1996',
        textInfo: "The Chiefs (formerly known as the Waikato Chiefs and officially called the Gallagher Chiefs for sponsorship reasons) are a New Zealand " +
        "professional rugby union team based in Hamilton, Waikato. " +
        "The Chiefs are central to six provincial teams; Waikato, Bay of Plenty, Taranaki and Counties Manukau playing in the National Provincial Championship (NPC), " +
        "with Thames Valley and King Country competing in the Heartland Championship."
    },
    {
        type: 'Super Rugby Club',
        displayName: 'Queensland Reds',
        abbreviation: 'REDS',
        logo: RedsLogo,
        colour: '#D01044',
        id: '182',
        defaultLeague: 'Super Rugby Pacific',
        foundedYear: '1996',
        textInfo: "The Queensland Reds is the rugby union team for the Australian state of Queensland that competes in the Southern Hemisphere's Super Rugby competition. " +
        "Prior to 1996, they were a representative team selected from the rugby union club competitions in Queensland. "
    },
    {
        type: 'Super Rugby Club',
        displayName: 'Highlanders',
        abbreviation: 'HLAND',
        logo: HighlandersLogo,
        colour: '#ebbc13',
        id: '25938',
        defaultLeague: 'Super Rugby Pacific',
        foundedYear: '1996',
        textInfo: "The Highlanders (formerly the Otago Highlanders) is a New Zealand professional rugby union team based in Dunedin. " +
        "The team was formed in 1996 to represent the lower South Island in the newly formed Super 12 competition, and includes the Otago, " +
        "North Otago and Southland unions. The Highlanders take their name from the Scottish immigrants that founded the Otago, North Otago, " +
        "and Southland regions in the 1840s and 1850s. "
    },
    {
        type: 'Super Rugby Club',
        displayName: 'Fijian Drua',
        abbreviation: 'FIJ',
        logo: DruaLogo,
        colour: '#1313eb',
        id: '289338',
        defaultLeague: 'Super Rugby Pacific',
        foundedYear: '2017',
        textInfo: "The Fijian Drua (currently known as the Swire Shipping Fijian Drua for sponsorship reasons) is a professional rugby union team based in Fiji. " +
        "The team was created by the Fiji Rugby Union and launched in August 2017. "
    },
    {
        type: 'Super Rugby Club',
        displayName: 'Melbourne Rebels',
        abbreviation: 'REBEL',
        logo: RebelsLogo,
        colour: '#002B5C',
        id: '25894',
        defaultLeague: 'Super Rugby Pacific',
        foundedYear: '2009',
        textInfo: "The Melbourne Rebels were an Australian professional rugby union team based in Melbourne. " +
        "The Rebels made their debut in SANZAR's Super Rugby tournament in 2011."
    },
    {
        type: 'Super Rugby Club',
        displayName: 'Crusaders',
        abbreviation: 'CRUS',
        logo: CrusadersLogo,
        colour: '#e84141',
        id: '25936',
        defaultLeague: 'Super Rugby Pacific',
        foundedYear: '1996',
        textInfo: "The Crusaders (formerly Canterbury Crusaders) are a New Zealand professional rugby union team based in Christchurch. " +
        "Formed in 1996 to represent the upper South Island of New Zealand in the Super 12, the Crusaders represent the Buller, Canterbury, " +
        "Mid-Canterbury, South Canterbury, Tasman and West Coast provincial Rugby Unions."
    },
    {
        type: 'Super Rugby Club',
        displayName: 'Western Force',
        abbreviation: 'FORCE',
        logo: ForceLogo,
        colour: '#004A9F',
        id: '25893',
        defaultLeague: 'Super Rugby Pacific',
        foundedYear: '2005',
        textInfo: "The Western Force is an Australian professional rugby union team based in Perth, Western Australia. " +
        "They previously played in Super Rugby from 2006 until they were axed from the competition in 2017."
    },
    {
        type: 'Super Rugby Club',
        displayName: 'Moana Pasifika',
        abbreviation: 'MOA',
        logo: MoanaLogo,
        colour: '#0bd1e3',
        id: '289319',
        defaultLeague: 'Super Rugby Pacific',
        foundedYear: '2020',
        textInfo: "Moana Pasifika is a rugby union team made up of players from various Pacific Island nations as well as New Zealand " +
        "or Australian born players of Pasifika heritage, including Fiji, Samoa, Tonga and the Cook Islands. " +
        "The team was originally created for a one-off match against the Māori All Blacks in December 2020, with the future intention of " +
        "trying to join the Super Rugby competition. On 14 April 2021, New Zealand Rugby confirmed the side had been granted a conditional " +
        "licence to join the Super Rugby competition."
    },
    {
        type: 'Super Rugby Club',
        displayName: 'New South Wales Waratahs',
        abbreviation: 'WARAT',
        logo: WaratahsLogo,
        colour: '#D41042',
        id: '227',
        defaultLeague: 'Super Rugby Pacific',
        foundedYear: '1882',
        textInfo: "The New South Wales Waratahs referred to as the Waratahs, are an Australian professional rugby union team representing the majority of New South Wales. " +
        "In 1882 the first New South Wales team was selected to play Queensland in a two-match series. "
    },
  ];