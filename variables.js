const API_KEY = 'api_key=5b6e6406d9a0fb2859535c275f83e448';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&&vote_average.gte=0.5&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;
const rating_URL= BASE_URL + '/discover/movie?sort_by=vote_average.desc&vote_count.gte=5000&'+API_KEY;
const popularity_URL= BASE_URL + '/discover/movie?sort_by=popularity.desc&vote_average.gte=1.5&'+API_KEY;
const releaseDates_URL= BASE_URL + 
'/discover/movie?sort_by=primary_release_date.desc&vote_average.gte=6&primary_release_date.lte=2021-07-30&vote_count.gte=30&'+API_KEY;

const current_url=API_URL;
const main = document.getElementById('main');
const form =  document.getElementById('form');
const search = document.getElementById('search');
const tagsEl = document.getElementById('tags');

const genres = [
    { "id": 28,   "name": "Action"        },
    { "id": 12,   "name": "Adventure"     },
    { "id": 16,   "name": "Animation"     },
    { "id": 35,   "name": "Comedy"        },
    { "id": 80,   "name": "Crime"         },
    { "id": 99,   "name": "Documentary"   },
    { "id": 18,   "name": "Drama"         },
    { "id": 10751,"name": "Family"        },
    { "id": 14,   "name": "Fantasy"       },
    { "id": 36,   "name": "History"       },
    { "id": 27,   "name": "Horror"        },
    { "id": 10402,"name": "Music"         },
    { "id": 9648, "name": "Mystery"       },
    { "id": 10749,"name": "Romance"       },
    { "id": 878,  "name": "Science Fiction"},
    { "id": 10770,"name": "TV Movie"      },
    { "id": 53,   "name": "Thriller"      },
    { "id": 10752,"name": "War"           },
    { "id": 37,   "name": "Western"       }
]
