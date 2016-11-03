/*

My Custom JS
============

Author:  Nitin Verma
Updated: oct 2016

*/


$(function() {
    $("#mybut").click(function(e) {
        e.preventDefault();
        var $searchMovies = $('#searchMovies'); //for movies catagory
        var $searchSeries = $('#searchSeries'); // for series catagory
        var $searchInput = $('#searchInput').val().trim(); //for removing spaces from search Item
        var input = new RegExp($searchInput, "i");
        var $contentMovies = $('#searchMovies');
        var $contentSeries = $('#searchSeries');
        var $contentError = $('#contentError');
        var series=0;
        var count = 0;
        var post = $('.post');

        $.ajax({
            type: 'GET',
            url: 'http://www.omdbapi.com/?s=' + $searchInput,
            success: function(movies) {
                $contentMovies.children().remove();
                $contentSeries.children().remove();
                $('#contentError').children().remove();
                $("#pagination").children().remove();
                // iterative function for search movies and series

                $.each(movies, function(i, items) {
                    if (i == "Search") {
                      $('#dangerAlert').children().remove();
                      $('#movies h2').show();

                        $.each(items, function(j, item) {
                            if ((item.Title).match(input) && item.Type == "movie") {
                                if (item.Poster != "N/A") {
                                    $searchMovies.append('<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 post"> <a href="#"><img src="' + item.Poster + '" alt="" class="img-responsive"></a>  <h4>' + item.Title + '(' + item.Year + ')</h4> <hr> </div>');
                                } else {
                                    $searchMovies.append('<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 post"> <a href="#"><img src="images/notAvailable.png" alt="" class="img-responsive"></a>  <h4>' + item.Title + '(' + item.Year + ')</h4> <hr> </div>');

                                }
                                count++;
                            }
                            if ((item.Title).match(input) && item.Type == "series") {
                                $('#series h2').show();
                                if (item.Poster != "N/A") {
                                    $searchSeries.append('<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12"> <a href="#"><img src="' + item.Poster + '" alt="" class="img-responsive"></a>  <h4>' + item.Title + '(' + item.Year + ')</h4> <hr> </div>');

                                } else {
                                    $searchSeries.append('<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12"> <a href="#"><img src="images/notAvailable.png" alt="" class="img-responsive"></a>  <h4>' + item.Title + '(' + item.Year + ')</h4> <hr> </div>');

                                }
                                series++;

                            }

                            else {

                                console.error();
                            }


                        })

                        //pagination starts here

                        var itemsPerPage = 3;
                        var paginationLength = Math.ceil(count / itemsPerPage);
                        $('.post').filter(":gt(" + (itemsPerPage - 1) + ")").hide();
                        for (var i = 0; i < paginationLength; i++) {
                            $("#pagination").append("<li><button type='button' class='btn btn-primary'>" + (i + 1) + "</button></li>");
                        }
                        $("#pagination li").on('click', function() {
                            $('.post').hide();
                            var linkNumber = $(this).text();
                            $(linkNumber).addClass("btn btn-danger");
                            var contentToShow = $('.post').filter(':lt(' + linkNumber * itemsPerPage + ')');
                            var contentToHide = $('.post').filter(':lt(' + (linkNumber - 1) * itemsPerPage + ')')
                            $.merge(contentToHide, $('.post').filter(":gt(" + (((linkNumber) * itemsPerPage) - 1) + ")"));

                            contentToShow.show();
                            contentToHide.hide();
                        });

                    }
                    // for error handeling
                    if (i == "Error") {

                        $('#dangerAlert').show();
                        $contentError.append('<h4>no result for "' + $searchInput + '"</h4> <h5> WE COULDNOT FIND ANY RESULTS FOR " ' + $searchInput + '" - PLEASE TRY AGAIN');
                        $('#movies h2').hide();
                        $('#series h2').hide();
                    }

                })
            }
        });
    });
});
