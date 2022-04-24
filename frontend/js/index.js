function fetch_movies(genre) {
    if (genre) {
        adress = `http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=${genre}`
    } else {
        adress = `http://localhost:8000/api/v1/titles/?sort_by=-imdb_score`
    }
    fetch(adress)
        .then(function(response) {
            return response.json()
        })
        .then(function(infos){
            create_carousel(infos, genre)
            if (!genre) {
                get_best(infos.results)
            }
            // console.log(infos.results, infos.next)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
};
fetch_movies('');
fetch_movies('action');
fetch_movies('adventure');
fetch_movies('animation');

function show_modal(movie_id) {
    var modal = document.getElementById(`modal_wrapper`)
    create_modal(movie_id)
    modal.style.opacity= 1;
    modal.style.visibility= "visible";
}
function close_modal() {
    var modal = document.getElementById(`modal_wrapper`)
    modal.style.opacity= 0;
    modal.style.visibility= "hidden";
}

function refresh_carousel(genre, link) {
    fetch(link)
        .then(function(response) {
            return response.json()
        })
        .then(function(infos){
            if (genre) {
                create_carousel(infos, `${genre}`)
            } else {
                create_carousel(infos, ``)
            }
            
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}