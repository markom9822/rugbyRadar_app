
import * as urcJSONData from '@/store/PlayerImages/URCPlayerImages.json'
import * as premJSONData from '@/store/PlayerImages/PremPlayerImages.json'
import * as top14JSONData from '@/store/PlayerImages/Top14PlayerImages.json'
import * as miscJSONData from '@/store/PlayerImages/MiscPlayerImages.json'

import { getChampsCupShortNameFromFullName } from '../ChampionsCupRugbyTeamsDatabase';


export const getPlayerImageSrc = (leagueName: string, teamName: string, playerName: string) => {

  const urcTeamArray = Array.from(urcJSONData.teams);
  const premTeamArray = Array.from(premJSONData.teams);
  const top14TeamArray = Array.from(top14JSONData.teams);
  const miscTeamArray = Array.from(miscJSONData.teams);

  const champsCupTeamArray = [...urcTeamArray, ...premTeamArray, ...top14TeamArray, ...miscTeamArray]

  var leagueTeamArray;
  var correctTeamName = ''

  if(leagueName === 'urc')
  {
    correctTeamName = teamName.replace(" Rugby", "")
    leagueTeamArray = urcTeamArray;
  }
  else if (leagueName === "prem")
  {
    correctTeamName = teamName.replace(" Rugby", "")
    leagueTeamArray = premTeamArray;
  }
  else if (leagueName === "top14")
  {
    correctTeamName = teamName;
    leagueTeamArray = top14TeamArray;
  }
  else if(leagueName === "championsCup" || leagueName === "challengeCup")
  {
    correctTeamName = getChampsCupShortNameFromFullName(teamName)
    leagueTeamArray = champsCupTeamArray;
  }


  console.info(playerName)
  console.info(correctTeamName)

  const searchTeamName = correctTeamName; 

  const targetTeam = champsCupTeamArray.find(item => item.name === searchTeamName);

  var targetImgSrc = ''

  if(targetTeam == null) return ''

  for (let index = 0; index < targetTeam.players.length; index++) {
    
    if(targetTeam.players[index].name?.toLowerCase() === playerName.toLowerCase())
    {
      targetImgSrc = targetTeam.players[index].image ?? '';
        break;
    }
    
  }

  return targetImgSrc;

}