
const overlayContent = document.getElementById('overlay-content');
function openNav(movie) {
  let id = movie.id;
  fetch(BASE_URL + '/movie/' + id + '/videos?' + API_KEY).then(res => res.json()).then(videoData => {
    console.log(videoData);
    if (videoData) {
      document.getElementById("myNav").style.width = "100%";
      if (videoData.results.length > 0) {
        var embed = [];
        videoData.results.forEach((video, idx) => {
          let { name, key, site } = video
          if (site == 'YouTube') {
            embed.push(`
              <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" 
              class="embed hide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; 
              encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          `)
          }
        })
        var content = `
        <h1 class="no-results">${movie.original_title}</h1>
        <br/>
        ${embed.join('')}
        <br/>
        `
        overlayContent.innerHTML = content;
        activeSlide = 0;
        showVideos();
      } else {
        overlayContent.innerHTML = `<h1 class="no-results">No Results Found</h1>`
      }
    }
  })
}
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

let activeSlide = 0;
let totalVideos = 0;

function showVideos() {
  let embedClasses = document.querySelectorAll('.embed');
  totalVideos = embedClasses.length;
  embedClasses.forEach((embedTag, idx) => {
    if (activeSlide == idx) {
      embedTag.classList.add('show')
      embedTag.classList.remove('hide')

    } else {
      embedTag.classList.add('hide');
      embedTag.classList.remove('show')
    }
  })

}

const leftArrow = document.getElementById('left-arrow')
const rightArrow = document.getElementById('right-arrow')

leftArrow.addEventListener('click', () => {
  if (activeSlide > 0) {
    activeSlide--;
  } else {
    activeSlide = totalVideos - 1;
  }
  showVideos()
})
rightArrow.addEventListener('click', () => {
  if (activeSlide < (totalVideos - 1)) {
    activeSlide++;
  } else {
    activeSlide = 0;
  }
  showVideos()
})




/*****************************************************/
const overlayContent2 = document.getElementById('overlay-content2');
function openNav2(movie) {
  let id = movie.id;
  fetch(BASE_URL + '/movie/' + id + '?' + API_KEY).then(res => res.json()).
  then(movieData => {
    console.log(movieData);
    if(movieData){
      document.getElementById("myNav2").style.width = "100%";
      if(movieData.overview.length>0){
        content2 = `
        <img src="${movie.poster_path? IMG_URL+movie.poster_path: 
          "http://via.placeholder.com/1080x1580" }" class="poster">
        <div class="title">     ${movie.original_title} &nbsp            
          <span class="${getColor(movie.vote_average)}">${movie.vote_average}</span>
        </div>
        <div class="date">      ${movie.release_date}       </div><br/>
        <div class="desc"> Overview: <br/>     ${movie.overview}           </div> <br/>
        <div class="rated">     ${movie.adult? `Rated R`: `General Audience`} </div>
        <div class="lang">  language:             ${movie.original_language}  </div>
        `
        overlayContent2.innerHTML = content2;
      }
    }
  })
}
function closeNav2() {
  document.getElementById("myNav2").style.width = "0%";
}
