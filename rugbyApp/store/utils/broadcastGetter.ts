import { BBCIPlayerLogo, BBCNILogo, BBCOneLogo, BBCWalesLogo, BEINSportsLogo, DiscoveryPlusLogo, EPCRTVLogo, FloRugbyLogo, ITVLogo, ITVXLogo, PremierSportsLogo, RTELogo, RugbyTVLogo, S4CLogo, SkySportsLogo, STVHDLogo, STVPlayerLogo, SuperSportLogo, TG4Logo, TNTSportsLogo } from "../BroadcasterLogos/BroadcasterLogos";

export const broadcasters = [
    { name: 'RTE', logo: RTELogo},
    { name: 'S4C', logo: S4CLogo},
    { name: 'SS', logo: SuperSportLogo},
    { name: 'Prem', logo: PremierSportsLogo},
    { name: 'premier', logo: PremierSportsLogo},
    { name: 'DISC', logo: DiscoveryPlusLogo},
    { name: 'beIN', logo: BEINSportsLogo},
    { name: 'TG4', logo: TG4Logo},
    { name: 'TNT', logo: TNTSportsLogo},
    { name: 'BBCW', logo: BBCWalesLogo},
    { name: 'BBCN', logo: BBCNILogo},
    { name: 'FloRugby', logo: FloRugbyLogo},
    { name: 'RUGBYTV', logo: RugbyTVLogo},
    { name: 'epcrtv', logo: EPCRTVLogo},

    // channels from planet rugby API
    { name: 'TNT Sport 1', logo: TNTSportsLogo},
    { name: 'TNT Sport 2', logo: TNTSportsLogo},
    { name: 'TNT Sport Ultimate', logo: TNTSportsLogo},
    { name: 'discovery +', logo: DiscoveryPlusLogo},
    { name: 'BBC 1', logo: BBCOneLogo},
    { name: 'BBC iPlayer', logo: BBCIPlayerLogo},
    { name: 'BBC Player', logo: BBCIPlayerLogo},
    { name: 'Premier Sports 1', logo: PremierSportsLogo},
    { name: 'Premier Sports 2', logo: PremierSportsLogo},
    { name: 'Premier Player', logo: PremierSportsLogo},
    { name: 'ITV 1', logo: ITVLogo},
    { name: 'ITV X', logo: ITVXLogo},
    { name: 'STV HD', logo: STVHDLogo},
    { name: 'STV player', logo: STVPlayerLogo},
    { name: 'RTE 2 HD', logo: RTELogo},
    { name: 'Sky Sport Plus', logo: SkySportsLogo},
    { name: 'Sky Sport MIX HD', logo: SkySportsLogo},
    { name: 'Sky Sports Action / HD', logo: SkySportsLogo},
];

export const getBroadcasterLogo = (broadcasterName: string) => {
    const result = broadcasters.find((element) => element.name === broadcasterName)
    return result?.logo
}