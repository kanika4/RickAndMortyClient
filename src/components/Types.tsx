export type CharacterProps = {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: {
        name: string,
        url: string
    },
    location: {
        name: string,
        url: string
    },
    image: string,
    episode: Array<string>,
    url: string,
    created: string
}

export type LocationProps = {
    id: number,
    name: string,
    type: string,
    dimension: string,
    residents: Array<string>,
    url: string,
    created: string
}

export type ChapterProps = {
    id: number,
    name: string,
    air_date: string,
    episode: string,
    characters: Array<string>,
    url: string,
    created: string
}

export type CharacterSchema = {
    info: {
        count: number,
        pages: number,
        next: string,
        prev: string
    },
    results: Array<CharacterProps> | CharacterProps[]
}

export type Error = {
    status: string,
    error: string
}

export type State = {
    loading: boolean,
    data: CharacterSchema | CharacterProps | LocationProps | ChapterProps | Error | undefined,
    error: Error | undefined
}

export type GetData = (query: Array<number>) => Promise<any>

