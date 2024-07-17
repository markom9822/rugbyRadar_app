export const getPremTeamInfoFromName = (name: string) => {

    const match = PremRugbyTeams.find((item) => item.displayName === name)
    if(match !== undefined)
    {
        return match
    }
    else
    {
        return null
    }
}


export const PremRugbyTeams = [
  {
    type: 'Prem Club',
    displayName: '',
    abbreviation: '',
    logo: '',
    colour: '#003287',
  },
  
];