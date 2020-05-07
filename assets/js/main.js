$(document).ready(function () {

    var search = $('.search-movies');
    var button = $('.btn-search');
    var listMovie = $('.list-movie');
    var title = $('.font-title');

    // Handlebars
    var source = $('#movie-template').html();
    var template = Handlebars.compile(source);


    // Ricerca tramite invio
    button.click(function () {

        if (search.val() !== '') {

            searchMovie(template, search, listMovie, 'Film');

            searchMovie(template, search, listMovie, 'Serie TV');

        } else {
            alert('ATTENZIONE, il campo è vuoto!')
            search.select();
        };

    });


    // Ricerca tramite tasto invio
    search.keyup(function (event) {

        if (event.which == 13) {

            if (search.val() !== '') {

                searchMovie(template, search, listMovie, 'Film');

                searchMovie(template, search, listMovie, 'Serie TV');

            } else {
                alert('ATTENZIONE, il campo è vuoto!')
                search.select();
            };
        }
    });

    title.click(function () {

        search.val('');
        reset(listMovie);

    })
});

// FUNCTION

// Function Ajax
function searchMovie(template, search, listMovie, type) {

    reset(listMovie);

    var apiUrl;

    if (type == 'Film') {
        apiUrl = 'https://api.themoviedb.org/3/search/movie';
    } else if (type == 'Serie TV') {
        apiUrl = 'https://api.themoviedb.org/3/search/tv';
    }

    $.ajax({
        url: apiUrl,
        method: 'GET',
        data: {
            api_key: '52e0283b908f5c27bb45c3eabf7e608e',
            query: search.val().trim(),
            language: 'it-IT',
        },
        success: function (res) {

            var movies = res.results;

            if (movies.length > 0) {

                printMovie(template, movies, listMovie, type)

            } else {

                alert('Nessun film trovato')
                search.select();
            }

        },
        error: function () {
            console.log('Errore nella chiamata' + type);
        }
    });
}

// Funzione per printare i film
function printMovie(template, movies, container, type) {

    // reset(container);

    for (var i = 0; i < movies.length; i++) {

        var thisFilm = movies[i];

        var title, originalTitle;

        if (type == 'Film') {

            title = thisFilm.title;
            originalTitle = thisFilm.original_title;

        } else if (type == 'Serie TV') {

            title = thisFilm.name
            originalTitle = thisFilm.original_name
        }

        var image;

        if (thisFilm.poster_path == null) {

            image = 'assets/img/no-poster.png';

        } else {
            image = "https://image.tmdb.org/t/p/w342/" + thisFilm.poster_path;
        }

        var context = {
            posterImage: image,
            title: title,
            originalTitle: originalTitle,
            originalLanguage: flag(thisFilm.original_language),
            vote: star(thisFilm.vote_average),
            tipo: type,
            overview: thisFilm.overview.substr(0, 80) + '...'
        };
        var set = template(context);

        container.append(set);
    };
};

// funzione di reset
function reset(element) {
    element.html('');
};


// Funzione per le stelline
function star(n) {

    var thisNumber = Math.ceil(n / 2);

    var resultStar = '';

    for (i = 0; i < +5; i++) {

        if (i <= thisNumber) {

            resultStar += '<i class="fas fa-star"></i>'
        } else {

            resultStar += '<i class="far fa-star"></i>'
        }

    }

    return resultStar;
};

// Funzione per le bandiere
function flag(flags) {

    if (flags === 'en') {

        return '<img class="img-flag" src="assets/img/en.svg" alt="Bandiera inglese">'
    } else if (flags === 'it') {

        return '<img class="img-flag" src="assets/img/it.svg" alt="Bandiera italiana">'
    } else {

        return flags;
    }
};