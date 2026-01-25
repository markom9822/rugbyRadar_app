import { getChampsCupShortNameFromFullName } from '../ChampionsCupRugbyTeamsDatabase'
import { supabase } from '../../supabaseUtils/supabase';

export const DefaultPlayerImg = require('@/store/PlayerImages/default_player.png')

export const getPlayerImageSrc = async (leagueName: string, teamName: string, playerName: string): Promise<string> => {
  let correctTeamName = teamName.replace(" Rugby", "");

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
