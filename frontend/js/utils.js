

function create_carousel(movies, genre) {
    if (genre) {
        var section = document.getElementById(`${genre}_movies_by_note`)
    } else  {
        var section = document.getElementById(`movies_by_note`)
    }
    
    for (const movie of movies.results) {
        // console.log(section, `carousel_${movies.results.indexOf(movie)}`)
        var img = section.getElementsByClassName(`carousel_${movies.results.indexOf(movie)}`)[0]
        var btn_modal = section.getElementsByClassName(`button_carousel_${movies.results.indexOf(movie)}`)[0]
        // console.log(btn_modal)
        btn_modal.setAttribute("onclick", `show_modal('${movie.id}')`)
        // console.log(img)
        // console.log(movie.image_url, movie.title)
        img.src = `${movie.image_url}`
        img.alt = `${movie.title}`
    }
    if (movies.next) {
        var button = section.getElementsByClassName("next")[0]
        // console.log(button.onclick)
        button.setAttribute("onclick", `refresh_carousel('${genre}', '${movies.next}')`)
        button.disabled = false
    } else {
        var button = section.getElementsByClassName("next")[0]
        // console.log(button.onclick)
        button.setAttribute("onclick", ``)
        button.disabled = true
    }
    if (movies.previous) {
        var button = section.getElementsByClassName("prev")[0]
        button.setAttribute("onclick", `refresh_carousel('${genre}', '${movies.previous}')`)
        button.disabled = false
    } else {
        var button = section.getElementsByClassName("prev")[0]
        // console.log(button.onclick)
        button.setAttribute("onclick", ``)
        button.disabled = true
    }
}

function get_best(movies) {
    const movie = movies[0]
    var img = document.getElementById(`best_movie_img`)
    var best_movie_title = document.getElementById(`best_movie_title`)
    var button_best_movie = document.getElementById(`button_best_movie`)
    button_best_movie.setAttribute("onclick", `show_modal('${movie.id}')`)
    best_movie_title.innerText = `${movie.title}`
    img.src = `${movie.image_url}`
    img.alt = `${movie.title}`
    
}

function create_modal(movie_id) {
    adress = `http://localhost:8000/api/v1/titles/${movie_id}`
    fetch(adress)
        .then(function(response) {
            return response.json()
        })
        .then(function(infos){
            console.log(infos)
            modal = document.getElementById('modal')
            modal.innerHTML = `
            <img id="img_modal" src="${infos.image_url}" alt="${infos.title}"/>
            <div>
                <h3 id="title_modal">${infos.title}</h3>
                <span id="genre_modal">Genre(s): ${infos.genres}</span><br>
                Date de sortie: ${infos.date_published}<br>
                Rated: ${infos.rated}<br>
                Score Imdb: ${infos.imdb_score}<br>
                Réalisateur: ${infos.directors}<br>
                Acteurs: ${infos.actors}<br>
                Durée: ${infos.duration} minutes<br>
                Pays d’origine: ${infos.countries}<br>
                Résultat au Box Office:<br> 
                World: ${infos.worldwide_gross_income}$<br>
                USA: ${infos.usa_gross_income}$<br>
                Description: <br>
                ${infos.long_description}<br>
            </div>
            <button id="modal_close" onclick="close_modal()">X</button>`
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}
