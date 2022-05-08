function fetch_movies(genre) {
    if (genre) {
        var adress = `http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=${genre}`
    } else {
        var adress = `http://localhost:8000/api/v1/titles/?sort_by=-imdb_score`
    }
    fetch(adress)
        .then(function(response) {
            return response.json()
        })
        .then(function(infos){
            if (!genre) {
                get_best(infos.results)
            }
            create_carousel(infos.results, genre, adress)
            
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
function refresh_carousel(genre, link, inc, int_min) {
    // count = (count + randomNumber) % colours.length;
    fetch(link)
        .then(function(response) {
            return response.json()
        })
        .then(function(infos){
            let movies_1 = infos.results
            fetch(infos.next)
                .then(function(response) {
                    return response.json()
                })
                .then(function(infos){
                    let movies_full = movies_1.concat(infos.results)
                    movies_full = movies_full.slice(0, 7)
                    var movies = []
                    int_min_loop = int_min+inc
                    if (int_min_loop == -1) {
                        int_min_loop = movies_full.length -1
                        int_min = movies_full.length
                    }
                    console.log('-----', movies_full.length)
                    console.log('first_loop', int_min_loop)
                    for(var i = 0; i < 4; i++){
                        console.log(int_min_loop)
                        movies.push(movies_full[int_min_loop])
                        int_min_loop = (int_min_loop + 1) % movies_full.length;
                    }
                    console.log('init', int_min+inc)
                    if (genre) {
                        create_carousel(movies, `${genre}`, link, int_min=int_min+inc)
                    } else {
                        create_carousel(movies, ``, link, int_min=int_min+inc)
                    }
                })
        })
}
