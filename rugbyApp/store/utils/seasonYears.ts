export type SeasonConfig = {
    startMonth: number        // 0-11: month the new season starts (Sept = 8, Feb = 1)
    spansTwoYears: boolean    // true = labelled by END year (e.g. 2024-25 -> "2025")
    firstYear: number         // earliest season you have data for
    intervalYears?: number    // e.g. 4 for the Rugby World Cup
}

export const SEASON_CONFIGS: Record<string, SeasonConfig> = {
    urc:            { startMonth: 8, spansTwoYears: true,  firstYear: 2022 },
    prem:           { startMonth: 8, spansTwoYears: true,  firstYear: 2018 },
    top14:          { startMonth: 7, spansTwoYears: true,  firstYear: 2018 },
    championsCup:   { startMonth: 11, spansTwoYears: true, firstYear: 2018 },
    challengeCup:   { startMonth: 11, spansTwoYears: true, firstYear: 2018 },
    superRugby:     { startMonth: 1, spansTwoYears: false, firstYear: 2018 },
    sixNations:     { startMonth: 0, spansTwoYears: false, firstYear: 2018 },
    u20SixNations:  { startMonth: 0, spansTwoYears: false, firstYear: 2018 },
    u20Championship:{ startMonth: 5, spansTwoYears: false, firstYear: 2018 },
    rugbyChamp:     { startMonth: 7, spansTwoYears: false, firstYear: 2018 },
    rugbyWorldCup:  { startMonth: 0, spansTwoYears: false, firstYear: 1987, intervalYears: 4 },
}

export const getCurrentSeasonYear = (cfg: SeasonConfig, now = new Date()): number => {
    const year = now.getFullYear()
    if (!cfg.spansTwoYears) return year
    return now.getMonth() >= cfg.startMonth ? year + 1 : year
}

export const getSeasonYearOptions = (leagueName: string, maxOptions = 10, now = new Date()): string[] => {
    const cfg = SEASON_CONFIGS[leagueName]
    if (!cfg) return []

    const interval = cfg.intervalYears ?? 1
    let year = getCurrentSeasonYear(cfg, now)

    // align to the interval (e.g. latest World Cup year <= current year)
    year -= (year - cfg.firstYear) % interval

    const options: string[] = []
    for (; year >= cfg.firstYear && options.length < maxOptions; year -= interval) {
        options.push(String(year))
    }
    return options
}