import * as interTeamArrayJSONData from '@/store/PlayerImages/InternationalPlayerImages.json'
import * as miscJSONData from '@/store/PlayerImages/MiscPlayerImages.json'
import * as premJSONData from '@/store/PlayerImages/PremPlayerImages.json'
import * as superRugbyJSONData from '@/store/PlayerImages/SuperRugbyPlayerImages.json'
import * as top14JSONData from '@/store/PlayerImages/Top14PlayerImages.json'
import * as urcJSONData from '@/store/PlayerImages/URCPlayerImages.json'
import { getChampsCupShortNameFromFullName } from '../ChampionsCupRugbyTeamsDatabase'

export const getPlayerImageSrc = (leagueName: string, teamName: string, playerName: string) => {

  const urcTeamArray = Array.from(urcJSONData.teams);
  const premTeamArray = Array.from(premJSONData.teams);
  const top14TeamArray = Array.from(top14JSONData.teams);
  const superRugbyTeamArray = Array.from(superRugbyJSONData.teams);

  const miscTeamArray = Array.from(miscJSONData.teams);
  const interTeamArray = Array.from(interTeamArrayJSONData.teams)

  const champsCupTeamArray = [...urcTeamArray, ...premTeamArray, ...top14TeamArray, ...miscTeamArray]

  let leagueTeamArray: any[] = [];
  let correctTeamName = ''

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
  else if (leagueName === "superRugby")
  {
    correctTeamName = teamName;
    leagueTeamArray = superRugbyTeamArray;
  }
  else if(leagueName === "championsCup" || leagueName === "challengeCup")
  {
    correctTeamName = getChampsCupShortNameFromFullName(teamName)
    leagueTeamArray = champsCupTeamArray;
  }
  else if(leagueName === "sixNations")
  {
    correctTeamName = teamName;
    leagueTeamArray = interTeamArray;
  }

  console.info(playerName)
  console.info(correctTeamName)

  const searchTeamName = correctTeamName; 

  const targetTeam = leagueTeamArray.find(item => item.name === searchTeamName);

  let targetImgSrc = ''

  if(targetTeam == null) return ''

  for (let index = 0; index < targetTeam.players.length; index++) {
    
    if(targetTeam.players[index].name?.toLowerCase() === playerName.toLowerCase())
    {
      targetImgSrc = targetTeam.players[index].image ?? '';
        break;
    }
  }

  console.info(targetImgSrc)
  return targetImgSrc;
}