export interface PeopleData {
    count: number
    next: string
    previous: string
    results: Result[]
  }
  
  export interface Result {
    name: string
    height: string
    mass: string
    hair_color: string
    skin_color: string
    eye_color: string
    birth_year: string
    gender: string
    homeworld: string
    films: string[]
    species: string[]
    vehicles: string[]
    starships: string[]
    created: string
    edited: string
    url: string
  }
  
  export interface FilmsData {
    title: string
    episode_id: number
    opening_crawl: string
    director: string
    producer: string
    release_date: string
    characters: string[]
    planets: string[]
    starships: string[]
    vehicles: string[]
    species: string[]
    created: string
    edited: string
    url: string
  }

  export interface SpeciesData {
    name: string
    classification: string
    designation: string
    average_height: string
    skin_colors: string
    hair_colors: string
    eye_colors: string
    average_lifespan: string
    homeworld: string
    language: string
    people: string[]
    films: string[]
    created: string
    edited: string
    url: string
  }
  
  