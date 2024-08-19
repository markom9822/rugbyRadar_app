import { DefaultLogo } from "./InternationalTeamLogos/InternationalTeams"
import { BenettonLogo, BullsLogo, CardiffLogo, ConnachtLogo, DragonsLogo, EdinburghLogo, GlasgowLogo, LeinsterLogo, LionsLogo, MunsterLogo, OspreysLogo, ScarletsLogo, SharksLogo, StormersLogo, UlsterLogo, ZebreLogo } from "./URCTeamLogos/URCTeams"


export const getURCTeamInfoFromName = (name: string) => {

  const defaultTeam =  {
    type: 'URC Club',
    displayName: 'Default',
    abbreviation: 'DEF',
    logo: DefaultLogo,
    colour: '#00845c',
    id: '0',
    defaultLeague: '',
    foundedYear: '',
    textInfo: ''
  }
    const match = URCRugbyTeams.find((item) => item.displayName === name)
    if(match !== undefined)
    {
        return match
    }
    else
    {
        return defaultTeam
    }
}


export const URCRugbyTeams = [
  {
    type: 'URC Club',
    displayName: 'Leinster',
    abbreviation: 'LEINS',
    logo: LeinsterLogo,
    colour: '#003287',
    id: '25924',
    defaultLeague: 'United Rugby Championship',
    foundedYear: '1879',
    textInfo: "Leinster Rugby is one of the four professional provincial club rugby union teams from the island of Ireland." +
    "The Leinster Branch was inaugurated at a meeting on 31 October 1879 and turned professional along with its fellow Irish provinces in 1995." +
    "The province plays primarily in blue with white or yellow trim and the team crest features a harp within a rugby ball," +
    "the harp being an ancient symbol of the province found in and taken from the flag of Leinster, although the traditional colours" +
    "of Leinster Rugby mean the design more resembles the flag of the president of Ireland or the coat of arms of Ireland."
  },
  {
    type: 'URC Club',
    displayName: 'Munster',
    abbreviation: 'MUNST',
    logo: MunsterLogo,
    colour: '#cd0a2d',
    id: '25925',
    defaultLeague: 'United Rugby Championship',
    foundedYear: '1879',
    textInfo: "Munster Rugby is one of the professional provincial rugby teams from the island of Ireland." +
    "The team represents the IRFU's Munster Branch, which is responsible for rugby union throughout the Irish" +
     "province of Munster. The team motto is 'To the brave and faithful, nothing is impossible'." +
     "The Munster Branch was inaugurated at a meeting on 31 October 1879 and turned professional along with its fellow Irish provinces in 1995."
  },
  {
    type: 'URC Club',
    displayName: 'Connacht',
    abbreviation: 'CONN',
    logo: ConnachtLogo,
    colour: '#00b446',
    id: '25923',
    defaultLeague: 'United Rugby Championship',
    foundedYear: '1885',
    textInfo: "Connacht Rugby is one of the four professional provincial rugby teams from the island of Ireland." +
    "The Connacht Branch was inaugurated in 1889 and turned professional along with its fellow Irish provinces in 1995." +
    "With the province containing just over 8% of the total Irish population, Connacht has a much smaller base of rugby" +
    "union players to choose from than the other three provinces."
  },
  {
    type: 'URC Club',
    displayName: 'Ulster',
    abbreviation: 'ULST',
    logo: UlsterLogo,
    colour: '#e61d03',
    id: '25926',
    defaultLeague: 'United Rugby Championship',
    foundedYear: '1879',
    textInfo: "Ulster Rugby is one of the four professional provincial rugby union teams from the island of Ireland." +
    "The team represents the IRFU Ulster Branch, which is one of the four primary branches of the IRFU and is responsible" +
    "for rugby union throughout the geographical Irish province of Ulster, comprising Northern Ireland (Antrim, Armagh, Down," +
    "Fermanagh, Londonderry and Tyrone) and three counties in the Republic of Ireland which are Donegal, Monaghan and Cavan." + 
    "The Ulster Branch was inaugurated in 1879 and turned professional along with its fellow Irish provinces in 1995."
  },
  {
    type: 'URC Club',
    displayName: 'Edinburgh',
    abbreviation: 'EDINB',
    logo: EdinburghLogo,
    colour: '#1e144b',
    id: '25951',
    defaultLeague: 'United Rugby Championship',
    foundedYear: '1872',
    textInfo: "Edinburgh Rugby (formerly Edinburgh Reivers, Edinburgh Gunners) is one of the two professional rugby union teams from Scotland." +
    "Edinburgh District played in the world's first ever inter-district match, against Glasgow District, in 1872."
  },
  {
    type: 'URC Club',
    displayName: 'Glasgow Warriors',
    abbreviation: 'GLASG',
    logo: GlasgowLogo,
    colour: '#5aaaf0',
    id: '25952',
    defaultLeague: 'United Rugby Championship',
    foundedYear: '1872',
    textInfo: "Glasgow Warriors are a professional rugby union side from Scotland." +
    "Glasgow Warriors are a continuation of the amateur Glasgow District side founded in 1872." +
    "Reshaped as a professional club in 1996, Glasgow Warriors were originally known as Glasgow Rugby before rebranding" +
    "as Glasgow Caledonians in 1998 by a merger with the Caledonian Reds. They dropped the Caledonians to become Glasgow" +
    "Rugby in 2001 again and finally rebranded as the Glasgow Warriors in 2005."
  },
  {
    type: 'URC Club',
    displayName: 'Cardiff Blues',
    abbreviation: 'CDB',
    logo: CardiffLogo,
    colour: '#6ebeff',
    id: '25965',
    defaultLeague: 'United Rugby Championship',
    foundedYear: '2003',
    textInfo: "Cardiff Rugby are one of the four professional Welsh rugby union teams." +
    "Originally formed in 1876, from 2003 to 2021 the first team was known as the Cardiff Blues before rebranding" +
    "back to Cardiff Rugby prior to the start of the 2021–22 season." +
    "They are one of a small number of clubs to have beaten the three major Southern Hemisphere international sides. South Africa , New Zealand, and Australia."
  },
  {
    type: 'URC Club',
    displayName: 'Scarlets',
    abbreviation: 'SCARL',
    logo: ScarletsLogo,
    colour: '#78040d',
    id: '25966',
    defaultLeague: 'United Rugby Championship',
    foundedYear: '2003',
    textInfo: "The Scarlets are one of the four professional Welsh rugby union teams and are based in Llanelli, Wales." +
    "The club was originally named the Llanelli Scarlets but was renamed at the start of the 2008–09 rugby season." +
    "The Llanelli Scarlets were founded in 2003, as one of the five (now four) regional teams created by the Welsh Rugby Union (WRU)."
  },
  {
    type: 'URC Club',
    displayName: 'Ospreys',
    abbreviation: 'OSP',
    logo: OspreysLogo,
    colour: '#5a5a64',
    id: '25968',
    defaultLeague: 'United Rugby Championship',
    foundedYear: '2003',
    textInfo: "The Ospreys, formerly the Neath–Swansea Ospreys is one of the four professional rugby union teams from Wales." +
    "The team formed as a result of Neath RFC and Swansea RFC combining to create a new merged entity, as part of the new regional" +
    "structure of Welsh rugby, that began in 2003." +
    "The regional area represented by the team has widely become known for rugby purposes as 'Ospreylia'." +
    "Ospreys currently play in a black home strip, while the away strip is white and orange. The Ospreys logo consists of an image of an Osprey mask."
  },
  {
    type: 'URC Club',
    displayName: 'Dragons',
    abbreviation: 'DRA',
    logo: DragonsLogo,
    colour: '#ffaa00',
    id: '25967',
    defaultLeague: 'United Rugby Championship',
    foundedYear: '2003',
    textInfo: "Dragons RFC are one of the four professional rugby union regional teams in Wales." +
    "As a result of the introduction of regional rugby union teams in Wales the Dragons were founded in 2003." +
    "The region they represent covers an area of southeast Wales including Blaenau Gwent, Caerphilly, Monmouthshire," +
    "Newport and Torfaen with a total population approaching 600,000."
  },
  {
    type: 'URC Club',
    displayName: 'Benetton Treviso',
    abbreviation: 'TRE',
    logo: BenettonLogo,
    colour: '#00b46f',
    id: '25927',
    defaultLeague: 'United Rugby Championship',
    foundedYear: '1932',
    textInfo: "Benetton Rugby, also known as Benetton Treviso, is an Italian professional rugby union team based in Treviso, Veneto." +
    "Treviso rugby team was founded in 1932 and has won multiple Italian national championships. The team has been owned by the Benetton clothing company since 1979."
  },
  {
    type: 'URC Club',
    displayName: 'Zebre',
    abbreviation: 'ZEB',
    logo: ZebreLogo,
    colour: '#233268',
    id: '167124',
    defaultLeague: 'United Rugby Championship',
    foundedYear: '1973',
    textInfo: "Zebre Parma are an Italian professional rugby union team based in Parma (Emilia-Romagna). " +
    "Zebre Parma, often referred to as 'the XV of the North-West' (Italian: il XV del Nord-Ovest), represents " +
    "the four committees of Emilia-Romagna, Liguria, Lombardy and Piedmont, which includes tens of thousands of members and several clubs. " +
    "The club was founded in 1973 as an Invitational Team and disbanded in 1997, the club later went professional in 2012."
  },
  {
    type: 'URC Club',
    displayName: 'Stormers',
    abbreviation: 'STORM',
    logo: StormersLogo,
    colour: '#005295',
    id: '25962',
    defaultLeague: 'United Rugby Championship',
    foundedYear: '1997',
    textInfo: "The Stormers (known for sponsorship reasons as the DHL Stormers) is a South African professional rugby union team based in Cape Town in the Western Cape. " + 
    "The Stormers franchise was founded in 1997."
  
  },
  {
    type: 'URC Club',
    displayName: 'Bulls',
    abbreviation: 'BULLS',
    logo: BullsLogo,
    colour: '#0082e6',
    id: '25953',
    defaultLeague: 'United Rugby Championship',
    foundedYear: '1997',
    textInfo: "The Bulls (known for sponsorship reasons as the Vodacom Bulls) are a South African professional rugby union team based in Pretoria. " +
    "The Bulls franchise was founded in 1997."
  },
  {
    type: 'URC Club',
    displayName: 'Lions',
    abbreviation: 'LIONS',
    logo: LionsLogo,
    colour: '#ff1e29',
    id: '25958',
    defaultLeague: 'United Rugby Championship',
    foundedYear: '1996',
    textInfo: "The Lions (known as the Emirates Lions for sponsorship reasons) is a South African professional rugby union team based in Johannesburg in the Gauteng province. " +
    "They are the successor of the teams known as Transvaal (1996), Gauteng Lions (1997) and the Cats (1998–2006). " +
    "The Lions franchise was founded in 1996."
  },
  {
    type: 'URC Club',
    displayName: 'Sharks',
    abbreviation: 'SHARK',
    logo: SharksLogo,
    colour: '#504b50',
    id: '25961',
    defaultLeague: 'United Rugby Championship',
    foundedYear: '1995',
    textInfo: "The Sharks (known as the Hollywoodbets Sharks as they are their title sponsor) is a South African professional rugby union team based in Durban in KwaZulu-Natal. " +
    "The Sharks franchise was founded in 1995."
  },

];