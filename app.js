//genres
let selectedGenre = []
setGenre();
function setGenre() {
    tagsEl.innerHTML= '';
    genres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id=genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () => {
            if(selectedGenre.length == 0){
                selectedGenre.push(genre.id);
            }else{
                if(selectedGenre.includes(genre.id)){
                    selectedGenre.forEach((id, idx) => {
                        if(id == genre.id){
                            selectedGenre.splice(idx, 1);
                        }
                    })
                }else{
                    selectedGenre.push(genre.id);
                }
            }
            console.log(selectedGenre)
            getMovies(current_url + '&with_genres='+encodeURI(selectedGenre.join(',')))
            highlightSelection()
        })
        tagsEl.append(t);
    })
}
function highlightSelection() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.classList.remove('highlight')
    })
    if (selectedGenre.length !=0) clearBtn() 
    
    if(selectedGenre.length !=0){   
        selectedGenre.forEach(id => {
            const hightlightedTag = document.getElementById(id);
            hightlightedTag.classList.add('highlight');
        })
    }
}
function clearBtn(){
  let clearBtn = document.getElementById('clear');
  if(clearBtn){
      clearBtn.classList.add('highlight')
  }else{
          
      let clear = document.createElement('div');
      clear.classList.add('tag','highlight');
      clear.id = 'clear';
      clear.innerText = 'Clear x';
      clear.addEventListener('click', () => {
          selectedGenre = [];
          setGenre();            
          getMovies(current_url);
      })
      tagsEl.append(clear);
  }
  
} 



//sort by
function popularity() {
    getMovies(popularity_URL)
    current_url=popularity_URL
}

function release_dates() {
    getMovies(releaseDates_URL)
    current_url=releaseDates_URL
}

function rating() {
    getMovies(rating_URL)
    current_url=rating_URL
}



//search button
form.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const searchTerm = search.value;
    //selectedGenre=[];
    //setGenre();
    if(searchTerm) {
        getMovies(searchURL+'&query='+searchTerm)
    }else{
        getMovies(API_URL);
    }
})



//movies
getMovies(API_URL);
function getMovies(url) {
  lastUrl = url;
    fetch(url).then(res => res.json()).then(data => { 
        console.log(data.results)
        
        if(data.results.length !== 0){
            showMovies(data.results);
            //tagsEl.scrollIntoView({behavior : 'smooth'})

        }else{
            main.innerHTML= `<h1 class="no-results">No Results Found</h1>`
        }
    })
}
function showMovies(data) {
    main.innerHTML = ''; 

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, id, release_date} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
             <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
            <h8>${release_date}</h8> 
            <h3>Overview</h3> 
            <p> ${overview}</p>
            <button class="trailer" id="${id}">Movie Trailer</button>
            <button class="know-more ${id}" onclick="openNav2() ">Know More</button>
            </div>`
        main.appendChild(movieEl);
        document.getElementById(id).addEventListener('click', () => {
            console.log(id)
            openNav(movie)
        })  
        var elements = document.getElementsByClassName(id);
        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click', () => {
                console.log(id)
                openNav2(movie)
            })  
        }
    })
}


//rating
function getColor(vote) {
  if(vote>= 8){
      return 'green'
  }else if(vote >= 5){
      return "orange"
  }else{
      return 'red'
  }
}

