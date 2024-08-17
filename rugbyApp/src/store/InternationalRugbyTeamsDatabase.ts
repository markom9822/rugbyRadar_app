import { ArgentinaLogo, AustraliaLogo, BALionsLogo, CanadaLogo, ChileLogo, DefaultLogo, EnglandLogo, FijiLogo, FranceLogo, GeorgiaLogo, IrelandLogo, ItalyLogo, JapanLogo, NamibiaLogo, NewZealandLogo, PortugalLogo, RomaniaLogo, RussiaLogo, SamoaLogo, ScotlandLogo, SouthAfricaLogo, SpainLogo, TongaLogo, UruguayLogo, USALogo, WalesLogo } from "./InternationalTeamLogos/InternationalTeams";

export const getInternationalTeamInfoFromName = (name: string) => {

  const defaultTeam =  {
    type: 'International',
    displayName: 'Default',
    abbreviation: 'DEF',
    logo: DefaultLogo,
    colour: '#00845c',
    id: '0',
    textInfo: '',
  }

    const match = InternationalRugbyTeams.find((item) => item.displayName === name)
    if(match !== undefined)
    {
        return match
    }
    else
    {
        return defaultTeam
    }
}

export const InternationalRugbyTeams = [
  {
    type: 'International',
    displayName: 'Ireland',
    abbreviation: 'IRE',
    logo: IrelandLogo,
    colour: '#00845c',
    id: '3',
    textInfo: "The Ireland national rugby union team is the men's representative " + 
    "national team for the island of Ireland in rugby union. The team represents both the Republic of Ireland and Northern Ireland.\n\n" +  
    "Ireland competes in the annual Six Nations Championship and in the Rugby World Cup. Ireland is one of the four unions that make up" + 
    " the British & Irish Lions. The Ireland national team dates to 1875, when it played its first international match against England."
  },
  {
    type: 'International',
    displayName: 'South Africa',
    abbreviation: 'SA',
    logo: SouthAfricaLogo,
    colour: '#006400',
    id: '5',
    textInfo: "The South Africa national rugby union team, commonly known as the Springboks (colloquially the Boks, Bokke or Amabhokobhoko)," + 
     "is the country's national team governed by the South African Rugby Union. The Springboks play in green and gold jerseys with white shorts," + 
    "and their emblem is the Springbok, a native antelope and the national animal of South Africa." + 
    "The team made its World Cup debut in 1995, when the newly democratic South Africa hosted the tournament." + 
    "Rugby union is a highly popular sport in South Africa, often attracting the country's most talented athletes."
  },
  {
    type: 'International',
    displayName: 'England',
    abbreviation: 'ENG',
    logo: EnglandLogo,
    colour: '#ffffff',
    id: '1',
    textInfo: "The England men's national rugby union team represents the Rugby Football Union in men's international rugby union." + 
     "They compete in the annual Six Nations Championship with France, Ireland, Italy, Scotland and Wales." + 
     "The history of the team extends back to 1871 when the English rugby team played their first official test match, losing 1–0 to Scotland." + 
     "England players traditionally wear a white shirt with a rose embroidered on the chest, white shorts, and navy blue socks with a white trim." + 
     "England's home ground is Twickenham Stadium where they first played in 1910."
  },
  {
    type: 'International',
    displayName: 'New Zealand',
    abbreviation: 'NZL',
    logo: NewZealandLogo,
    colour: '#ffffff',
    id: '8',
    textInfo: "The New Zealand national rugby union team, commonly known as the All Blacks, represents New Zealand in men's international rugby union," +
     "which is considered the country's national sport. Famed for their international success, the All Blacks have often been regarded as one of the most" + 
     "successful sports teams in history." +
     "The team's first match took place in 1884 in New South Wales and their first international test match in 1903 against Australia in Sydney." + 
     "New Zealand's early uniforms consisted of a black jersey with a silver fern and white shorts. By the 1905 tour they were wearing all black, except" + 
     "for the silver fern, and the name 'All Blacks' dates from this time."  +
     "The team perform a haka before every match; this is a Māori challenge or posture dance."
  },
  {
    type: 'International',
    displayName: 'Australia',
    abbreviation: 'AUS',
    logo: AustraliaLogo,
    colour: '#ffbb00',
    id: '6',
    textInfo: "The Australia men's national rugby union team, nicknamed the Wallabies, is the representative men's national team in the sport of rugby union" + 
     "for the nation of Australia. The team first played at Sydney in 1899, winning their first test match against the touring British Isles team." + 
     "The nickname 'Wallabies' is in reference to the wallaby—a marsupial that is widely distributed throughout Australia. The name has its origins" +
     "during first United Kingdom and North America tour by the Australian team in 1908." + 
     "The Wallabies play in Australia's traditional sporting colours of green and gold."

  },
  {
    type: 'International',
    displayName: 'France',
    abbreviation: 'FRA',
    logo: FranceLogo,
    colour: '#003b7c',
    id: '9',
    textInfo: "The France national rugby union team (French: Équipe de France de rugby à XV) represents the French Rugby Federation (FFR; Fédération française de rugby)" + 
     "in men's international rugby union matches. Colloquially known as Le XV de France (French for 'The XV of France'), the team traditionally wears blue shirts with a" + 
      "Gallic rooster embroidered on the chest, white shorts and red socks in reference to the French national flag." + 
      "Rugby was introduced to France in 1872 by the British before a first France national team was formed in 1893 (as a selection of the best Parisian-club players under" + 
      "the USFSA governance) to face a club in England."
  },
  {
    type: 'International',
    displayName: 'Scotland',
    abbreviation: 'SCOT',
    logo: ScotlandLogo,
    colour: '#ffbb00',
    id: '2',
    textInfo: "The Scotland national rugby union team represents the Scottish Rugby Union in men's international rugby union." + 
    "The history of the team extends back to 1871 when the Scottish rugby team played their first official test match, winning 1–0 against England at Raeburn Place." + 
    "The thistle is the national flower, and also the symbol of the Scotland national rugby union team." + 
    "Scotland have traditionally worn navy blue jerseys, white shorts and blue socks."
  },
  {
    type: 'International',
    displayName: 'Wales',
    abbreviation: 'WALES',
    logo: WalesLogo,
    colour: '#d21034',
    id: '4',
    textInfo: "The Wales national rugby union team represents the Welsh Rugby Union in men's international rugby union. Its governing body, the Welsh Rugby Union (WRU)," + 
     "was established in 1881, the same year that Wales played their first international against England." + 
     "Wales play in red jerseys, white (or some times, black) shorts and red socks." + 
     "The Wales team experienced their first 'golden age' between 1900 and 1911; they first played New Zealand in 1905, winning 3–0 in a famous match at Cardiff Arms Park," + 
     "and between March 1907 and January 1910, they won 11 consecutive matches, a record that stood for over a century."
  },
  {
    type: 'International',
    displayName: 'Italy',
    abbreviation: 'ITALY',
    logo: ItalyLogo,
    colour: '#ffffff',
    id: '20',
    textInfo: "The Italy national rugby union team represents the Italian Rugby Federation in men's international rugby union. The team is known as gli Azzurri (the light-blues)." + 
    "Italy has played international rugby since 1929, and for decades was considered one of the best European teams outside the Five Nations Championship." + 
    "Italian rugby rose to prominence in 2000 when it was added to the Five Nations, creating the Six Nations."  +
    "Italy traditionally plays in blue jerseys, white shorts and blue stockings at home. Its away uniform consists of a uniform with the inverted colours."
  },
  {
    type: 'International',
    displayName: 'Argentina',
    abbreviation: 'ARG',
    logo: ArgentinaLogo,
    colour: '#43a1d5',
    id: '10',
    textInfo: "The Argentina national rugby union team (Spanish: Selección de rugby de Argentina) represents Argentina in men's international competitions," +
     "The Argentine Rugby Union. Officially nicknamed Los Pumas, they play in sky blue and white jerseys." + 
     "Argentina played its first international rugby match in 1910 against a touring British Isles team." + 
     "Los Pumas play in a shirt in the country's flag (and sporting) colours of light blue and white, white shorts, and socks in light blue and white."
  },
  {
    type: 'International',
    displayName: 'Japan',
    abbreviation: 'JPN',
    logo: JapanLogo,
    colour: '#f4d5e2',
    id: '23',
    textInfo: "The Japan national rugby union team, also known as the Cherry Blossoms, the Brave Blossoms, or simply Sakura, represents Japan in men's international rugby union." + 
    "Rugby was first played in Japan's treaty ports as early as 1866. Popular participation by local university teams was established in 1899 and Japan's first recorded international" +
    "match was a match against a Canadian team in 1932." +
    "Japan traditionally plays with white and red hooped shirts (with white collar and cuffs) with a Sakura embroidered on the chest, paired with white shorts and white socks with red splashes."
  },
  {
    type: 'International',
    displayName: 'Georgia',
    abbreviation: 'GEO',
    logo: GeorgiaLogo,
    colour: '#551828',
    id: '81',
    textInfo: "The Georgia national rugby union team, nicknamed The Lelos, represents Georgia in men's international rugby union." + 
    "There were several unsuccessful attempts to introduce a rugby union into Georgia, the earliest known being in 1928, with subsequent attempts also in 1940 and in 1948." +
    "The first teams appeared in 1959. The Georgia Rugby Union was founded in 1964, but until the late 1980s it was part of the Soviet Union's rugby federation."
  },
  {
    type: 'International',
    displayName: 'Fiji',
    abbreviation: 'FIJI',
    logo: FijiLogo,
    colour: '#ffffff',
    id: '14',
    textInfo: ''
  },
  {
    type: 'International',
    displayName: 'Canada',
    abbreviation: 'CAN',
    logo: CanadaLogo,
    colour: '#e82042',
    id: '25',
    textInfo: ''
  },
  {
    type: 'International',
    displayName: 'United States of America',
    abbreviation: 'USA',
    logo: USALogo,
    colour: '#0a3161',
    id: '11',
    textInfo: ''
  },
  {
    type: 'International',
    displayName: 'Romania',
    abbreviation: 'ROM',
    logo: RomaniaLogo,
    colour: '#002b7f',
    id: '12',
    textInfo: ''
  },
  {
    type: 'International',
    displayName: 'Portugal',
    abbreviation: 'POR',
    logo: PortugalLogo,
    colour: '#046a38',
    id: '27',
    textInfo: ''
  },
  {
    type: 'International',
    displayName: 'Namibia',
    abbreviation: 'NAMIB',
    logo: NamibiaLogo,
    colour: '#001489',
    id: '82',
    textInfo: ''
  },
  {
    type: 'International',
    displayName: 'Tonga',
    abbreviation: 'TONGA',
    logo: TongaLogo,
    colour: '#ed1c24',
    id: '16',
    textInfo: ''
  },
  {
    type: 'International',
    displayName: 'Samoa',
    abbreviation: 'SAMOA',
    logo: SamoaLogo,
    colour: '#264282',
    id: '15',
    textInfo: ''
  },
  {
    type: 'International',
    displayName: 'Spain',
    abbreviation: 'ESP',
    logo: SpainLogo,
    colour: '#ffcc00',
    id: '18',
    textInfo: ''
  },
  {
    type: 'International',
    displayName: 'Chile',
    abbreviation: 'CHILE',
    logo: ChileLogo,
    colour: '#0032a0',
    id: '28',
    textInfo: ''
  },
  {
    type: 'International',
    displayName: 'Uruguay',
    abbreviation: 'URUG',
    logo: UruguayLogo,
    colour: '#0038a8',
    id: '29',
    textInfo: ''
  },
  {
    type: 'International',
    displayName: 'Russia',
    abbreviation: 'RUS',
    logo: RussiaLogo,
    colour: '#ffff',
    id: '',
    textInfo: ''
  },
  {
    type: 'International',
    displayName: 'British and Irish Lions',
    abbreviation: 'LIONS',
    logo: BALionsLogo,
    colour: '#d21034',
    id: '32',
    textInfo: ''
  },
];