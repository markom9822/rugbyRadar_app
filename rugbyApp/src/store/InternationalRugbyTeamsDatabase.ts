import { ArgentinaLogo, AustraliaLogo, BALionsLogo, CanadaLogo, ChileLogo, DefaultLogo, EnglandLogo, FijiLogo, FranceLogo, GeorgiaLogo, IrelandLogo, ItalyLogo, JapanLogo, NamibiaLogo, NewZealandLogo, PortugalLogo, RomaniaLogo, RussiaLogo, SamoaLogo, ScotlandLogo, SouthAfricaLogo, SpainLogo, TongaLogo, UruguayLogo, USALogo, WalesLogo } from "./InternationalTeamLogos/InternationalTeams";

export const getInternationalTeamInfoFromName = (name: string) => {

  const defaultTeam =  {
    type: 'International',
    displayName: 'Default',
    abbreviation: 'DEF',
    logo: DefaultLogo,
    colour: '#00845c',
    id: '0',
    foundedYear: '',
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
    foundedYear: '1875',
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
    foundedYear: '1891',
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
    foundedYear: '1871',
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
    foundedYear: '1884',
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
    foundedYear: '1899',
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
    foundedYear: '1893',
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
    foundedYear: '1871',
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
    foundedYear: '1881',
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
    foundedYear: '1911',
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
    foundedYear: '1910',
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
    foundedYear: '1932',
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
    foundedYear: '1959',
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
    foundedYear: '1913',
    textInfo: "The Fiji national rugby union team nicknamed the 'Flying Fijians represents Fiji in men's international rugby union." +
    "Fiji is one of the few countries where rugby union is the main sport. There are approximately 80,000 registered players from a total population of around 950,000." + 
    "Rugby was first played in Fiji by European and Fijian soldiers of the Native Constabulary at Ba, on Viti Levu Island in 1884. In 1913 a Union was founded for the European settlers." +
    "Fiji traditionally plays with a home kit consisting of a white shirt, black shorts and black and white hooped socks." +
    "The away kit traditionally used to be a white and black hooped shirt with white shorts and hooped socks"
  },
  {
    type: 'International',
    displayName: 'Canada',
    abbreviation: 'CAN',
    logo: CanadaLogo,
    colour: '#e82042',
    id: '25',
    foundedYear: '1932',
    textInfo: "The Canada men's national rugby union team represents the Canada in men's international rugby union competitions." +
    "The Canadian Rugby Football Union was established in 1884 and they have been playing international rugby since their 1932 debut against Japan."
  },
  {
    type: 'International',
    displayName: 'United States of America',
    abbreviation: 'USA',
    logo: USALogo,
    colour: '#0a3161',
    id: '11',
    foundedYear: '1976',
    textInfo: "The United States men's national rugby union team, nicknamed the Eagles, represents the United States of America Rugby Football Union in men's international rugby union." +
    "The first recorded rugby game in the U.S. was played in May 1874 when local Harvard University hosted Canadian McGill University"
  },
  {
    type: 'International',
    displayName: 'Romania',
    abbreviation: 'ROM',
    logo: RomaniaLogo,
    colour: '#002b7f',
    id: '12',
    foundedYear: '1924',
    textInfo: "The Romania national rugby union team represents Romania in men's international rugby union competitions." +
    "Nicknamed Stejarii (The Oaks), the team is long considered one of the stronger European teams outside the Six Nations."  +
    "Romania's first international was played against the US in 1919. France first officially played rugby union against Romania in May 1924." + 
    "Romania usually wears a yellow shirt with blue shorts and red socks as home uniform."
  },
  {
    type: 'International',
    displayName: 'Portugal',
    abbreviation: 'POR',
    logo: PortugalLogo,
    colour: '#046a38',
    id: '27',
    foundedYear: '1935',
    textInfo: "The Portugal national rugby union team, nicknamed Os Lobos (The Wolves), represents Portugal in men's international rugby union competitions." +
    "Portugal played its first ever rugby international in April 1935 against Spain." +
    "Portugal have experienced modest success in the last two decades. They qualified for the 2007 Rugby World Cup in France and though they lost all their matches," +
    "they managed to score one try in each game and led against Romania until the late minutes."
  },
  {
    type: 'International',
    displayName: 'Namibia',
    abbreviation: 'NAMIB',
    logo: NamibiaLogo,
    colour: '#001489',
    id: '82',
    foundedYear: '1916',
    textInfo: "The Namibia national rugby union team represents Namibia in men's international rugby union competitions nicknamed the Welwitschias," +
     "are a tier-two nation in the World Rugby tier system" + 
     "Rugby union has been played in Namibia since 1916 when it was introduced by soldiers from South Africa who had invaded the German-run colony."
  },
  {
    type: 'International',
    displayName: 'Tonga',
    abbreviation: 'TONGA',
    logo: TongaLogo,
    colour: '#ed1c24',
    id: '16',
    foundedYear: '1924',
    textInfo: "The Tonga national rugby union team represents the Tonga Rugby Union in men's international rugby union. The team is nicknamed ʻIkale Tahi (Sea Eagles)." +
     "Like their Polynesian neighbours, the Tongans start their matches with a traditional challenge – the Sipi Tau (pre-game war dance)." +
     "Rugby was brought to the region in the early 20th century by sailors and missionaries, and the Tonga Rugby Football Union was formed in late 1923."

  },
  {
    type: 'International',
    displayName: 'Samoa',
    abbreviation: 'SAMOA',
    logo: SamoaLogo,
    colour: '#264282',
    id: '15',
    foundedYear: '1924',
    textInfo: "The Samoa national rugby union team represents the Samoa Rugby Union in men's international rugby union." +
    "They are also known as 'Manu Samoa', which is thought to derive from the name of a Samoan warrior." +
    "They perform a traditional Samoan challenge called the siva tau before each game." +
    "Rugby was introduced to Samoa in the early 1920s and a governing body was soon formed. The first international was played as Western Samoa against Fiji in August 1924."
  },
  {
    type: 'International',
    displayName: 'Spain',
    abbreviation: 'ESP',
    logo: SpainLogo,
    colour: '#ffcc00',
    id: '18',
    foundedYear: '1929',
    textInfo: "The Spain national rugby union team, nicknamed Los Leones (The Lions), represents the Spanish Rugby Federation in men's international rugby union competitions." +
    "Rugby union in Spain dates back to 1901, although Spain did not play its first international until 1929, beating Italy 9–0 in Barcelona." +
    "Historically, Spain's kit reflected the colours of Spain; a red jersey with blue shorts deriving from the House of Bourbon. The current home kit consists of a red shirt" +
    "with a triangular pattern and black on the waist sides, dark blue shorts and dark blue socks, while the away kit consists of a dark blue jersey, red waist sides, dark blue shorts and dark blue socks"
  },
  {
    type: 'International',
    displayName: 'Chile',
    abbreviation: 'CHILE',
    logo: ChileLogo,
    colour: '#0032a0',
    id: '28',
    foundedYear: '1936',
    textInfo: "The Chilean national rugby union team represents the Chilean Rugby Federation in men's international rugby union." +
    "Nicknamed Los Cóndores (The Condors in English), they play in red and white jerseys." +
    "Chile was the second South American nation after Argentina to play international rugby union, playing their first international test against Argentina in 1936 in Santiago."
  },
  {
    type: 'International',
    displayName: 'Uruguay',
    abbreviation: 'URUG',
    logo: UruguayLogo,
    colour: '#0038a8',
    id: '29',
    foundedYear: '1948',
    textInfo: "The Uruguay national rugby union team, nicknamed Los Teros, represents the Uruguayan Rugby Union in men's international rugby union." +
    "Uruguay made their official international debut in 1948, in a game against Chile, which Uruguay lost 21–3." +
    "Uruguay has consistently been one of the better fringe international sides in rugby union, having consistently beaten Tier 2/3 competition from across the globe."
  },
  {
    type: 'International',
    displayName: 'Russia',
    abbreviation: 'RUS',
    logo: RussiaLogo,
    colour: '#ffff',
    id: '',
    foundedYear: '1974',
    textInfo: "The Russia national rugby union team, nicknamed Medvedi (The Bears), represented Russia in men's international rugby union international competitions." +
    "The Rugby Union of the Soviet Union was founded in 1936, although the national side did not play its first official international until 1974."
  },
  {
    type: 'International',
    displayName: 'British and Irish Lions',
    abbreviation: 'LIONS',
    logo: BALionsLogo,
    colour: '#d21034',
    id: '32',
    foundedYear: '1888',
    textInfo: "The British & Irish Lions is a rugby union team selected from players eligible for the national teams of England, Ireland, Scotland, and Wales." +
     "The Lions are a test side and most often select players who have already played for their national team, although they can pick uncapped players who are " +
     "eligible for any of the four unions. The team tours every four years, with these rotating between Australia, New Zealand and South Africa in order." +
     "From 1888 onwards, combined British rugby sides toured the Southern Hemisphere. The first tour was a commercial venture, undertaken without official backing." +
    "The six subsequent visits enjoyed a growing degree of support from the authorities, before the 1910 South Africa tour, which was the first tour representative of the four Home Unions."

  },
];