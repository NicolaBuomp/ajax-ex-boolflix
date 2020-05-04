$(document).ready(function () {

    var search = $('.search-movies');
    var button = $('.btn-search');
    var listMovie = $('.list-movie');

    // Handlebars
    var source = $('#movie-template').html();
    var template = Handlebars.compile(source);


    button.click(function () { 

        listMovie.html('');
        
        $.ajax({
            url: 'https://api.themoviedb.org/3/search/movie',
            method: 'GET',
            data: {
                api_key: '52e0283b908f5c27bb45c3eabf7e608e',
                query: search.val().trim(),
                language: 'it-IT',
            },
            success: function (res) {
    
                var film = res.results;
    
                for (var i = 0; i < film.length; i++) {

                    search.val('');

                    var thisFilm = film[i];
    
                    var context={
                        title: 'Titolo: ' + thisFilm.title,
                        originalTitle:'Titolo originale: ' + thisFilm.original_title,
                        originalLanguage:'Lingua originale: '+ thisFilm.original_language,
                        vote: 'Voto: ' + thisFilm.vote_average,
                    };
    
                    var set = template(context);
    
                    listMovie.append(set);
    
                }
            },
            error: function () {
                console.log('Errore nella chiamata dei Film');
            }
        });
        
    });

});