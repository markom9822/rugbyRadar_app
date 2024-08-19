import { DefaultLogo } from "./InternationalTeamLogos/InternationalTeams";
import { BathLogo, BristolLogo, ExeterLogo, GloucesterLogo, HarlequinsLogo, LeicesterLogo, NewcastleLogo, NorthamptonLogo, SaleLogo, SaracensLogo } from "./PremiershipTeamsLogos/PremiershipTeams";

export const getPremTeamInfoFromName = (name: string) => {

  const defaultTeam =  {
    type: 'Prem Club',
    displayName: 'Default',
    abbreviation: 'DEF',
    logo: DefaultLogo,
    colour: '#00845c',
    id: '0',
    defaultLeague: '',
    foundedYear: '',
    textInfo: ''
  }
    const match = PremRugbyTeams.find((item) => item.displayName === name)
    if(match !== undefined)
    {
        return match
    }
    else
    {
        return defaultTeam
    }
}


export const PremRugbyTeams = [
  {
    type: 'Prem Club',
    displayName: 'Bath Rugby',
    abbreviation: 'BATH',
    logo: BathLogo,
    colour: '#1e3b84',
    id: '25898',
    defaultLeague: 'Premiership Rugby',
    foundedYear: '1865',
    textInfo: "Bath Rugby is a professional rugby union club in Bath, Somerset, England. They play in Premiership Rugby, England's top division of rugby. " +
     "Bath Football Club is one of the oldest clubs in existence, having been founded in 1865 by members of Lansdown Cricket Club in Bath, for 'something to do in the winter'. " +
     "Bath is one of only three clubs never to have been relegated from the top division of English rugby."
  },
  {
    type: 'Prem Club',
    displayName: 'Bristol Rugby',
    abbreviation: 'BRIST',
    logo: BristolLogo,
    colour: '#121254',
    id: '25899',
    defaultLeague: 'Premiership Rugby',
    foundedYear: '1888',
    textInfo: "Bristol Bears are a professional rugby union club based in Bristol, England. " +
    "The club was founded as Bristol Football Club in 1888. " +
    "In 2018, the club rebranded as Bristol Bears; between 2001 and 2005 the club were known as Bristol Shoguns due to a sponsorship deal with Mitsubishi."
  },
  {
    type: 'Prem Club',
    displayName: 'Exeter Chiefs',
    abbreviation: 'EXET',
    logo: ExeterLogo,
    colour: '#1a1a1a',
    id: '116227',
    defaultLeague: 'Premiership Rugby',
    foundedYear: '1871',
    textInfo: "Exeter Chiefs is an English professional rugby union club based in Exeter, Devon. " +
    "The club was founded in 1871 and since 2006 has played its home matches at Sandy Park, a purpose-built facility on the outskirts of the city. " +
    "They have been known by the name Chiefs since 1999."
  },
  {
    type: 'Prem Club',
    displayName: 'Gloucester Rugby',
    abbreviation: 'GLOUC',
    logo: GloucesterLogo,
    colour: '#c8202e',
    id: '25900',
    defaultLeague: 'Premiership Rugby',
    foundedYear: '1873',
    textInfo: "Gloucester Rugby are a professional rugby union club based in the West Country city of Gloucester, England. " +
    "The club was formed in 1873 and since 1891 has played its home matches at Kingsholm Stadium in the north of the city. " +
    "The club has no official nickname but is referred to as the Cherry and Whites by supporters and the media in reference to " +
    "the Cherry and white hooped shirts worn by the team. Matches with local rivals Bath and Bristol Bears are referred to as West Country derbies."
  },
  {
    type: 'Prem Club',
    displayName: 'Harlequins',
    abbreviation: 'HQUINN',
    logo: HarlequinsLogo,
    colour: '#b6234a',
    id: '25901',
    defaultLeague: 'Premiership Rugby',
    foundedYear: '1866',
    textInfo: "Harlequins is a professional rugby union club that plays in Premiership Rugby. Their home ground is the Twickenham Stoop, located in Twickenham, south-west London. " +
    "The club, which was founded in 1866 as 'Hampstead Football Club', split the following year with some of the membership forming Wasps RFC. " +
    "Three years later Hampstead renamed itself Harlequins and became one of the founding members of the Rugby Football Union in 1871. " +
    "The Harlequins kit is one of the most distinctive in the game. The kit has always featured a quartered shirt, typically consisting of chocolate brown, French grey," +
    " magenta and light blue with black and green sleeves, and most design changes have merely meant changes to the dimensions of the quarters, or the layout of the four main colours."
  },
  {
    type: 'Prem Club',
    displayName: 'Leicester Tigers',
    abbreviation: 'LEICS',
    logo: LeicesterLogo,
    colour: '#044437',
    id: '25903',
    defaultLeague: 'Premiership Rugby',
    foundedYear: '1880',
    textInfo: "Leicester Tigers are a professional rugby union club based in Leicester, England. " +
    "The club was founded in 1880 and since 1892 plays its home matches at Mattioli Woods Welford Road in the south of the city." +
    " The club has been known by the nickname Tigers since at least 1885."
  },
  {
    type: 'Prem Club',
    displayName: 'Newcastle Falcons',
    abbreviation: 'NEWC',
    logo: NewcastleLogo,
    colour: '#1a1a1a',
    id: '25906',
    defaultLeague: 'Premiership Rugby',
    foundedYear: '1877',
    textInfo: "Newcastle Falcons are a professional rugby union club based in Newcastle, England. " +
    "The club was established in 1877 as the Gosforth Football Club. Around 1882 the club merged with the Northumberland Football Club" +
     " and briefly assumed their name until 1887. In 1996, following the start of professionalism the club briefly adopted " +
     "the name Newcastle Rugby Club before adopting its current name."
  },
  {
    type: 'Prem Club',
    displayName: 'Northampton Saints',
    abbreviation: 'NTHMP',
    logo: NorthamptonLogo,
    colour: '#1a1a1a',
    id: '25907',
    defaultLeague: 'Premiership Rugby',
    foundedYear: '1880',
    textInfo: "Northampton Saints is a professional rugby union club from Northampton, England. " +
    "They were formed in 1880 as 'Northampton St. James', which gave them the nickname Saints from the 1880s. " +
    "Their biggest rivals are Leicester Tigers. 'The East Midlands Derby' is one of the fiercest rivalries in English rugby union."
  },
  {
    type: 'Prem Club',
    displayName: 'Sale Sharks',
    abbreviation: 'SALE',
    logo: SaleLogo,
    colour: '#000050',
    id: '25908',
    defaultLeague: 'Premiership Rugby',
    foundedYear: '1861',
    textInfo: "Sale Sharks is a professional rugby union club from Greater Manchester, England. " +
    "Originally founded in 1861 as Sale Football Club (which is now a distinct amateur club), it is one of the oldest existing football clubs. " +
    "It adopted the nickname Sharks in 1999."
  },
  {
    type: 'Prem Club',
    displayName: 'Saracens',
    abbreviation: 'SARAC',
    logo: SaracensLogo,
    colour: '#1a1a1a',
    id: '25909',
    defaultLeague: 'Premiership Rugby',
    foundedYear: '1876',
    textInfo: "Saracens Rugby Club is an English professional rugby union club based in North London, England. " +
    "Established in 1876, the club has spent most of its existence in and around Southgate in the London Borough of Enfield. " 
  },
  
];