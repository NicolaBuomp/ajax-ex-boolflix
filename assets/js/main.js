$(document).ready(function () {

    var search = $('.search-movies');
    var button = $('.btn-search');
    var listMovie = $('.list-movie');

    // Handlebars
    var source = $('#movie-template').html();
    var template = Handlebars.compile(source);


    button.click(function () {

        if (search.val() !== '') {

            $.ajax({
                url: 'https://api.themoviedb.org/3/search/movie',
                method: 'GET',
                data: {
                    api_key: '52e0283b908f5c27bb45c3eabf7e608e',
                    query: search.val().trim(),
                    language: 'it-IT',
                },
                success: function (res) {

                    var movies = res.results;

                    if (movies.length > 0) {

                        printMovie(template, movies, listMovie)
                    } else {

                        alert('Nessun film trovato')
                        search.select();
                    }

                },
                error: function () {
                    console.log('Errore nella chiamata dei Film');
                }
            });
        } else {
            alert('ATTENZIONE, il campo è vuoto!')
        };

        if (search.val() !== '') {

            $.ajax({
                url: 'https://api.themoviedb.org/3/search/tv',
                method: 'GET',
                data: {
                    api_key: '52e0283b908f5c27bb45c3eabf7e608e',
                    query: search.val().trim(),
                    language: 'it-IT',
                },
                success: function (res) {

                    var Tv = res.results;

                    if (Tv.length > 0) {

                        printTv(template, Tv, listMovie)
                    } else {

                        alert('Nessun film trovato')
                        search.select();
                    }

                },
                error: function () {
                    console.log('Errore nella chiamata dei Film');
                }
            });
        } else {
            alert('ATTENZIONE, il campo è vuoto!')
        };

        reset(listMovie);
    });

});

// FUNCTION

// Funzione per printare i film
function printMovie(template, movies, container) {

    // reset(container);

    for (var i = 0; i < movies.length; i++) {

        var thisFilm = movies[i];

        var context = {
            title: thisFilm.title,
            originalTitle: thisFilm.original_title,
            originalLanguage: flag(thisFilm.original_language),
            vote: star(thisFilm.vote_average),
            tipo: 'Film'
        };
        var set = template(context);

        container.append(set);
    };
};

// Funzione per printare le serie tv
function printTv(template, movies, container) {

    // reset(container);

    for (var i = 0; i < movies.length; i++) {

        var thisTv = movies[i];

        var context = {
            title: thisTv.name,
            originalTitle: thisTv.original_name,
            originalLanguage: flag(thisTv.original_language),
            vote: star(thisTv.vote_average),
            tipo: 'Serie TV'
        };

        var set = template(context);

        container.append(set);
    };
};

// funzione di reset
function reset(element) {
    element.html('');
};

function star (n){

    var thisNumber = Math.ceil(n / 2);
    
    var resultStar = '';

    for (i = 0; i < thisNumber; i++){

        resultStar += '<i class="fas fa-star"></i>'
    }

    if (thisNumber !== 0){

        return resultStar;
    } else {

        return 'NESSUN VOTO'
    }

};

function flag (flags){
    
    if (flags === 'en'){

        return '<img class="img-flag" src="assets/img/en.svg" alt="Bandiera inglese">'
    }else if (flags === 'it'){

        return '<img class="img-flag" src="assets/img/it.svg" alt="Bandiera italiana">'
    } else {

        return flags;
    }
};


