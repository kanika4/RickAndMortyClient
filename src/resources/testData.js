const data = {
  info: {
    count: 394,
    pages: 20,
    next: "https://rickandmortyapi.com/api/character/?page=2",
    prev: ""
  },
  results: [
    {
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      type: "",
      gender: "Male",
      origin: {
        name: "Earth",
        url: "https://rickandmortyapi.com/api/location/1"
      },
      location: {
        name: "Earth",
        url: "https://rickandmortyapi.com/api/location/20"
      },
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      episode: [
        "https://rickandmortyapi.com/api/episode/1",
        "https://rickandmortyapi.com/api/episode/2"
      ],
      url: "https://rickandmortyapi.com/api/character/1",
      created: "2017-11-04T18:48:46.250Z"
    }
  ]
};

const characterData = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: {
    name: "Earth",
    url: "https://rickandmortyapi.com/api/location/1"
  },
  location: {
    name: "Earth",
    url: "https://rickandmortyapi.com/api/location/20"
  },
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  episode: [
    "https://rickandmortyapi.com/api/episode/1",
    "https://rickandmortyapi.com/api/episode/2"
  ],
  url: "https://rickandmortyapi.com/api/character/1",
  created: "2017-11-04T18:48:46.250Z"
};

const emptyOriginLocationData = {
  info: {
    count: 394,
    pages: 20,
    next: "https://rickandmortyapi.com/api/character/?page=2",
    prev: ""
  },
  results: [
    {
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      type: "",
      gender: "Male",
      origin: {
        name: "",
        url: ""
      },
      location: {
        name: "",
        url: ""
      },
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      episode: [
        "https://rickandmortyapi.com/api/episode/1",
        "https://rickandmortyapi.com/api/episode/2"
      ],
      url: "https://rickandmortyapi.com/api/character/1",
      created: "2017-11-04T18:48:46.250Z"
    }
  ]
};

const locationData = {
  id: 1,
  name: "Earth",
  type: "Planet",
  dimension: "Dimension C-137",
  residents: [
    "https://rickandmortyapi.com/api/character/1",
    "https://rickandmortyapi.com/api/character/2"
  ],
  url: "https://rickandmortyapi.com/api/location/1",
  created: "2017-11-10T12:42:04.162Z"
};

const locationDataWithoutResidents = {
  id: 1,
  name: "Earth",
  type: "Planet",
  dimension: "Dimension C-137",
  url: "https://rickandmortyapi.com/api/location/1",
  created: "2017-11-10T12:42:04.162Z"
};

const chapterData = {
  id: 1,
  name: "Pilot",
  air_date: "December 2, 2013",
  episode: "S01E01",
  characters: [
    "https://rickandmortyapi.com/api/character/1",
    "https://rickandmortyapi.com/api/character/2"
  ],
  url: "https://rickandmortyapi.com/api/episode/1",
  created: "2017-11-10T12:56:33.798Z"
};

export {
  data,
  characterData,
  emptyOriginLocationData,
  locationData,
  chapterData,
  locationDataWithoutResidents
}

