import { getChampsCupShortNameFromFullName } from '../ChampionsCupRugbyTeamsDatabase'
import { supabase } from '../../supabaseUtils/supabase';
import { getTop14DatabaseShortNameFromESPNName } from '../Top14RugbyTeamsDatabase';

export const DefaultPlayerImg = require('@/store/PlayerImages/default_player.png')

export const getPlayerImageSrc = async (leagueName: string, teamName: string, playerName: string): Promise<string> => {
  let correctTeamName = teamName.replace(" Rugby", "");

  // if international then get from bucket
  if(leagueName === 'sixNations')
  {
    const teamSlug = correctTeamName.toLowerCase();
    
    const playerFileName = playerName
    .replace(/'/g, '')           
    .replace(/\s+/g, '')         
    + '.png';

    console.log("teams/team-" + teamSlug + "/" + playerFileName)
    const uri = await getPlayerImageSignedImageUrl("teams/team-" + teamSlug + "/" + playerFileName);
    return uri;
  }

  if (leagueName === 'championsCup' || leagueName === 'challengeCup') {
    correctTeamName = getChampsCupShortNameFromFullName(teamName);
    
    // Search ALL relevant tables for Champions Cup teams
    const tables = [
      'urc-club-playerimages',
      'prem-club-playerimages', 
      'top14-club-playerimages',
      'misc-club-playerimages'
    ];

    for (const tableName of tables) {
      const { data, error } = await supabase
        .from(tableName)
        .select('Image')
        .eq('Player', playerName)
        .eq('Team', correctTeamName)
        .maybeSingle(); // Use maybeSingle() - won't error if no match

      if (data?.Image) {
        return data.Image;
      }
    }
    
    return ''; // No match in any table
  }

  // Single table lookup for other leagues
  let leagueTableName = '';
  if (leagueName === 'urc') leagueTableName = 'urc-club-playerimages';
  else if (leagueName === 'prem') leagueTableName = 'prem-club-playerimages';
  else if (leagueName === 'top14') leagueTableName = 'top14-club-playerimages';
  else if (leagueName === 'superRugby') leagueTableName = 'superrugby-club-playerimages';

  if(leagueName === 'top14')
  {
    correctTeamName = getTop14DatabaseShortNameFromESPNName(correctTeamName);
  }

  console.info(`Correct team name: ${correctTeamName}`)

  const { data, error } = await supabase
    .from(leagueTableName)
    .select('Image')
    .eq('Player', playerName)
    .eq('Team', correctTeamName)
    .single();

  if (error) {
    console.info('Supabase error:', error);
    return '';
  }

  return data?.Image || '';
}


export const getPlayerImageSignedImageUrl = async (path: string) => {
  const { data, error } = await supabase
    .storage
    .from('player-images')
    .createSignedUrl(path, 60 * 60); // 1 hour

  if (error) throw error;
  return data.signedUrl;
};
