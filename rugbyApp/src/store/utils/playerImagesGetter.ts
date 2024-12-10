
import * as urcJSONData from '@/store/PlayerImages/URCPlayerImages.json'
import * as premJSONData from '@/store/PlayerImages/PremPlayerImages.json'
import * as top14JSONData from '@/store/PlayerImages/Top14PlayerImages.json'


interface Player {
    name: string;
    image: string;
  }
  
  interface Team {
    name: string;
    players: Player[];
  }
  
  interface RugbyTeams {
    teams: Team[];
  }


export const getPlayerImageSrc = (leagueName: string, teamName: string, playerName: string) => {

  const urcTeamArray = Array.from(urcJSONData.teams);
  const premTeamArray = Array.from(premJSONData.teams);
  const top14TeamArray = Array.from(top14JSONData.teams);


  const champsCupTeamArray = [...urcTeamArray, ...premTeamArray, ...top14TeamArray]

  const targetTeam = premTeamArray.find(item => item.name === teamName);
  console.info(targetTeam)

  var targetImgSrc = ''

  if(targetTeam == null) return ''

  for (let index = 0; index < targetTeam.players.length; index++) {
    
    if(targetTeam.players[index].name === playerName)
    {
        targetImgSrc = targetTeam.players[index].image;
        break;
    }
    
  }

  return targetImgSrc;

}