
export const getLeagueCode = (name: string) => {

    const leagueCodes = [
        { value: 'urc', code: "270557" },
        { value: 'prem', code: "267979" },
        { value: 'top14', code: "270559" },
        { value: 'rugbyChamp', code: "244293" },
        { value: 'rugbyWorldCup', code: "164205" },
        { value: 'championsCup', code: "271937" },
        { value: 'challengeCup', code: "272073" },


        { value: 'sixNations', code: "180659" },
        { value: 'inter', code: "289234" },
        { value: 'menSevens', code: "282" },

    ];

    const result = leagueCodes.find((element) => element.value == name)

    return result?.code.toString()
}

export function dateCustomFormatting(date: Date): string {
    const padStart = (value: number): string =>
        value.toString().padStart(2, '0');

    return `${date.getFullYear()}${padStart(date.getMonth() + 1)}${padStart(date.getDate())}`;
}