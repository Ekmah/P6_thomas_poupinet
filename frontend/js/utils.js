

function create_carousel(movies, genre) {
    if (genre) {
        var section = document.getElementById(`${genre}_movies_by_note`)
    } else  {
        var section = document.getElementById(`movies_by_note`)
    }
    
    for (const movie of movies.results) {
        // console.log(section, `carousel_${movies.results.indexOf(movie)}`)
        var img = section.getElementsByClassName(`carousel_${movies.results.indexOf(movie)}`)
        // console.log(img)
        // console.log(movie.image_url, movie.title)
        img[0].src = `${movie.image_url}`
        img[0].alt = `${movie.title}`
        var button = section.getElementsByClassName(`button_carousel_${movies.results.indexOf(movie)}`)
        button[0].value = `${movie.id}`
    }
    if (movies.next) {
        var button = section.getElementsByClassName("next")[0]
        // console.log(button.onclick)
        button.setAttribute("onclick", `refresh_carousel('${genre}', '${movies.next}')`)
    } else {
        var button = section.getElementsByClassName("next")[0]
        // console.log(button.onclick)
        button.setAttribute("onclick", ``)
    }
    if (movies.previous) {
        var button = section.getElementsByClassName("prev")[0]
        button.setAttribute("onclick", `refresh_carousel('${genre}', '${movies.previous}')`)
    } else {
        var button = section.getElementsByClassName("prev")[0]
        // console.log(button.onclick)
        button.setAttribute("onclick", ``)
    }
}

function get_best(movies) {
    const movie = movies[0]
    var img = document.getElementById(`best_movie`)
    // console.log(img)
    // console.log(movie.image_url, movie.title)
    img.src = `${movie.image_url}`
    img.alt = `${movie.title}`
    
}
