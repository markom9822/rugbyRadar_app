export const getTop14TeamInfoFromName = (name: string) => {

    const match = Top14RugbyTeams.find((item) => item.displayName === name)
    if(match !== undefined)
    {
        return match
    }
    else
    {
        return null
    }
}


export const Top14RugbyTeams = [
  {
    type: 'Top14 Club',
    displayName: '',
    abbreviation: '',
    logo: '',
    colour: '#003287',
  },
  
];