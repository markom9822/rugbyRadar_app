import { DefaultLogo } from "./InternationalTeamLogos/InternationalTeams";
import { BayonneLogo, BordeauxLogo, BriveLogo, CastresLogo, ClermontLogo, LaRochelleLogo, LyonLogo, MontpellierLogo, PauLogo, PerpignanLogo, Racing92Logo, StadeFrancaisLogo, ToulonLogo, ToulouseLogo, VannesLogo } from "./Top14TeamLogos/Top14Teams";

export const getTop14TeamInfoFromName = (name: string) => {

  const defaultTeam =  {
    type: 'Top14 Club',
    displayName: 'Default',
    abbreviation: 'DEF',
    logo: DefaultLogo,
    colour: '#00845c',
    id: '0',
    defaultLeague: '',
    foundedYear: '',
    textInfo: ''
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
    id: '25912',
    defaultLeague: 'Top 14',
    foundedYear: '1904',
    textInfo: "Aviron Bayonnais, commonly called Bayonne, is a French rugby union club from Bayonne (Baiona, in Basque) in Pyrénées-Atlantiques. " +
    "The club was established in 1904, making their first final appearance in the 1913 season. "
  },
  {
    type: 'Top14 Club',
    displayName: 'Bordeaux Begles',
    abbreviation: 'BEG',
    logo: BordeauxLogo,
    colour: '#',
    id: '143737',
    defaultLeague: 'Top 14',
    foundedYear: '2006',
    textInfo: "Union Bordeaux Bègles is a French professional rugby union team based in Bordeaux, France. " +
    "They were founded in 2006 as a result of a merger between two Bordeaux clubs, Stade Bordelais and Club Athlétique Bordeaux-Bègles Gironde. " + 
    "They wear claret (in French: bordeaux) and white."
  },
  {
    type: 'Top14 Club',
    displayName: 'Brive',
    abbreviation: 'BRIVE',
    logo: BriveLogo,
    colour: '#',
    id: '0',
    defaultLeague: 'Top 14',
    foundedYear: '1910',
    textInfo: "Club Athlétique Brive Corrèze Limousin, also referred to as CA Brive, Brive or CAB, is a French professional rugby union " +
    "club based in Brive-la-Gaillarde, in the Corrèze department. " +
    "Brive is a historical member of French rugby union, being one of the clubs that spent the most seasons in the top French domestic competition. " +
    "The club was created on 15 March 1910 established on 12 October 1912."
  },
  {
    type: 'Top14 Club',
    displayName: 'Castres Olympique',
    abbreviation: 'CAS',
    logo: CastresLogo,
    colour: '#',
    id: '25916',
    defaultLeague: 'Top 14',
    foundedYear: '1906',
    textInfo: "Castres Olympique is a French rugby union club located in the Occitanian city of Castres. " +
    "In 1898 several alumni of Castres' municipal college met in a city centre bar and decided to create a team " +
    "allowing them to play their favourite sport, rugby union. For the first few years this team was part of a multisport club until 1906."
  },
  {
    type: 'Top14 Club',
    displayName: 'Clermont Auvergne',
    abbreviation: 'CLER',
    logo: ClermontLogo,
    colour: '#',
    id: '25917',
    defaultLeague: 'Top 14',
    foundedYear: '1911',
    textInfo: "Association Sportive Montferrandaise Clermont Auvergne is a French professional rugby union club from Clermont-Ferrand in Auvergne-Rhône-Alpes. " +
    "The club was established in 1911 as AS Michelin, though they changed their name to AS Montferrandaise in 1919 due to legal obligation. " +
    "Although the rugby section changed its name to the current ASM Clermont Auvergne in 2004, it is still frequently referred to as Montferrand both within and outside France."
  },
  {
    type: 'Top14 Club',
    displayName: 'La Rochelle',
    abbreviation: 'LA RO',
    logo: LaRochelleLogo,
    colour: '#',
    id: '119318',
    defaultLeague: 'Top 14',
    foundedYear: '1898',
    textInfo: "Stade Rochelais commonly called La Rochelle, is a French professional rugby union club based in La Rochelle, France that competes in the Top 14. " +
    "Founded in 1898 and wearing yellow and black, the club's first-team plays its home matches at Stade Marcel-Deflandre."
  },
  {
    type: 'Top14 Club',
    displayName: 'Lyon',
    abbreviation: 'LYON',
    logo: LyonLogo,
    colour: '#',
    id: '143736',
    defaultLeague: 'Top 14',
    foundedYear: '1896',
    textInfo: "Lyon Olympique Universitaire Rugby or LOU is a French professional rugby union team based in Lyon. " +
    "They were founded in 1896 and play in red and black. In 2011, the team left the Stade Vuillermet to the new Matmut Stadium. " +
    "In 2017 the team moved to the Matmut Stadium de Gerland."
  },
  {
    type: 'Top14 Club',
    displayName: 'Montpellier Herault',
    abbreviation: 'MONTP',
    logo: MontpellierLogo,
    colour: '#',
    id: '25918',
    defaultLeague: 'Top 14',
    foundedYear: '1986',
    textInfo: "Montpellier Hérault Rugby (MHR) is a French professional rugby union club, based in Montpellier, Occitanie and named after the Hérault river. " +
    "The club was established in 1986 through the merger of two other rugby union clubs, the Stade Montpelliérain and MUC Rugby."
  },
  {
    type: 'Top14 Club',
    displayName: 'Vannes',
    abbreviation: 'VANN',
    logo: VannesLogo,
    colour: '#',
    id: '289337',
    defaultLeague: 'Top 14',
    foundedYear: '1950',
    textInfo: "RC Vannes is a French rugby union club based in Vannes. " +
    "Founded in 1950, they play in the Stade de la Rabine and traditionally wear blue and white jerseys."
  },
  {
    type: 'Top14 Club',
    displayName: 'Pau',
    abbreviation: 'PAU',
    logo: PauLogo,
    colour: '#',
    id: '270567',
    defaultLeague: 'Top 14',
    foundedYear: '1902',
    textInfo: "Section Paloise, often referred to simply as Section or Pau, is a professional rugby union club based in Pau, France. " +
    "Stade Palois was founded in 1899 by former students of the Lous-Barthou high school, who were imbued with Anglophilia, in vogue in Pau during the Belle Epoque."
  },
  {
    type: 'Top14 Club',
    displayName: 'Perpignan',
    abbreviation: 'PERP',
    logo: PerpignanLogo,
    colour: '#',
    id: '25920',
    defaultLeague: 'Top 14',
    foundedYear: '1933',
    textInfo: "Union Sportive Arlequins Perpignanais, also referred to as USA Perpignan or Perpignan, is a French professional rugby union" +
    " club founded in 1933 and based in Perpignan, in the Pyrénées-Orientales department. " +
    "The club is a result of a merger between US Perpignan and Arlequins Perpignanais in 1933. US Perpignan was also born from a union " +
    "of merging clubs AS Perpignan (founded in 1902) and Stade Olympien Perpignanais, which took place in 1919."
  },
  {
    type: 'Top14 Club',
    displayName: 'Racing 92',
    abbreviation: 'RAMET',
    logo: Racing92Logo,
    colour: '#',
    id: '99855',
    defaultLeague: 'Top 14',
    foundedYear: '1890',
    textInfo: "Racing 92 is a French professional rugby union club based in the Hauts-de-Seine department, Paris' western inner suburbs. " +
    "Founded in 1890 as the rugby union section of the Paris sports club Racing Club de France, Racing 92 is one of the oldest rugby clubs in " +
    "France and has traditionally worn a sky blue and white hooped home kit since its inception. The club in its current form is the result of a " +
    "merger with US Métro in 2001, having been rebranded Métro Racing 92 and then Racing Métro 92 from 2005 to 2015 when the club took its current name. " +
    "92 refers to the number of the Hauts-de-Seine department that henceforth supports the team."
  },
  {
    type: 'Top14 Club',
    displayName: 'Stade Francais Paris',
    abbreviation: 'SFRAN',
    logo: StadeFrancaisLogo,
    colour: '#',
    id: '25921',
    defaultLeague: 'Top 14',
    foundedYear: '1883',
    textInfo: "Stade Français Paris (known commonly as Stade Français) is a French professional rugby union club based in the 16th arrondissement of Paris. " +
    "The original Stade Français was founded in 1883. In its current form, the club was founded in 1995 with the merger of the rugby sections of the " +
    "Stade Français and Club Athlétique des Sports Généraux (CASG)."
  },
  {
    type: 'Top14 Club',
    displayName: 'Toulon',
    abbreviation: 'TOUL',
    logo: ToulonLogo,
    colour: '#',
    id: '25986',
    defaultLeague: 'Top 14',
    foundedYear: '1908',
    textInfo: "Rugby Club Toulonnais, also referred to as Rugby Club Toulon or simply Toulon, is a French professional rugby union club based in Toulon. " +
    "Founded in 1908, Toulon is one of the most important and widely supported rugby clubs in France. " +
    "A club renowned for its fans fervour and its stadium atmosphere, Toulon has rivalries with Toulouse" +
    " and Clermont and has traditionally worn a red and black home kit since its inception."
  },
  {
    type: 'Top14 Club',
    displayName: 'Stade Toulousain',
    abbreviation: 'TOUL',
    logo: ToulouseLogo,
    colour: '#',
    id: '25922',
    defaultLeague: 'Top 14',
    foundedYear: '1907',
    textInfo: "Stade Toulousain, also referred to as Toulouse, is a professional rugby union club based in Toulouse, France. " +
    "It is traditionally one of the main providers for the French national team and its youth academy is one of the best in the world. " +
    "Since its creation in 1907, Stade Toulousain drew on the past of the city. The design of Stade Toulousain's crest refers to the " +
    "initials of Thomas Aquinas whose bones rest in the Church of the Jacobins, in Toulouse."
  },
];