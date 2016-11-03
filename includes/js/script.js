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
                    var series = 0;
                    var count = 0;
                    var post = $('.post');

                    $.ajax({
                            type: 'GET',
                            url: 'http://www.omdbapi.com/?s=' + $searchInput,
                            success: function(movies) {
                              if(movies.Error=="Movie not found!"){

                                    $('#dangerAlert').show();
                                    $contentError.append('<h4>no result for "' + $searchInput + '"</h4> <h5> WE COULDNOT FIND ANY RESULTS FOR " ' + $searchInput + '" - PLEASE TRY AGAIN');
                                    $('#movies h2').hide();
                                    $('#series h2').hide();
                              }
                                $contentMovies.children().remove();
                                $contentSeries.children().remove();
                                // $('#contentError').children().remove();
                                $("#pagination").children().remove();
                                // iterative function for search movies and series
                                var numberofpages = Math.ceil(movies.totalResults / movies.Search.length);
                                // $.each(data.Search,function(i,rows){
                                for (var i = 1; i <= numberofpages; i++) {
                                    $.ajax({
                                        type: 'GET',
                                        url: 'http://www.omdbapi.com/?s='+$searchInput+'&page='+ i,
                                        success: function(subdata) {
                                            $.each(subdata.Search, function(j, item) {
                                                if ((item.Title).match(input)) {
                                                    if (item.Poster != "N/A") {
                                                        $searchMovies.append('<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 post"> <a href="#"><img src="' + item.Poster + '" alt="" class="img-responsive"></a>  <h4>' + item.Title + '-'+item.Type+'(' + item.Year + ')</h4> <hr> </div>');
                                                    }
                                                    else {
                                                        $searchMovies.append('<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 post"> <a href="#"><img src="images/notAvailable.png" alt="" class="img-responsive"></a>  <h4>' + item.Title +'-'+item.Type+ '(' + item.Year + ')</h4> <hr> </div>');
                                                    }
                                                    count++;

                                                }


                                                // if ((item.Title).match(input) && item.Type == "series") {
                                                //     $('#series h2').show();
                                                //     if (item.Poster != "N/A") {
                                                //         $searchSeries.append('<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12"> <a href="#"><img src="' + item.Poster + '" alt="" class="img-responsive"></a>  <h4>' + item.Title + '(' + item.Year + ')</h4> <hr> </div>');
                                                //     }
                                                //     else {
                                                //         $searchSeries.append('<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12"> <a href="#"><img src="images/notAvailable.png" alt="" class="img-responsive"></a>  <h4>' + item.Title + '(' + item.Year + ')</h4> <hr> </div>');
                                                //
                                                //     }
                                                //     series++;
                                                // }
                                                // if (series == 0) {
                                                //     $('#series h2').hide();
                                                // }
                                                else {
                                                    // $('#series h2').hide();
                                                    console.error();
                                                }

                                                $(".post:gt(8)").hide();
                                            });
                                        }
                                    });
                                }

                                //pagination starts here

                       var itemsPerPage = 12;
                       console.log(count);
                       var paginationLength = Math.ceil(movies.totalResults / itemsPerPage);

                       // $('.post').filter(":gt(" + (itemsPerPage - 1) + ")").hide();
                       for (var i = 0; i < paginationLength-1; i++) {
                           $("#pagination").append("<li><button type='button' class='btn btn-primary'>" + (i + 1) + "</button></li>");
                       }
                       $("#pagination li").on('click', function() {
                           $('.post').hide();
                           var linkNumber = $(this).text();
                           // $(linkNumber).addClass("btn btn-danger");
                           var contentToShow = $('.post').filter(':lt(' + linkNumber * itemsPerPage + ')');
                           var contentToHide = $('.post').filter(':lt(' + (linkNumber - 1) * itemsPerPage + ')')
                           $.merge(contentToHide, $('.post').filter(":gt(" + (((linkNumber) * itemsPerPage) - 1) + ")"));

                           contentToShow.show();
                           contentToHide.hide();
                       });


                                 }
                                //  console.log(movies.Error);
                                //  if ((movies.Error)== "Movie not found!") {
                                 //
                                //      $('#dangerAlert').show();
                                //      $contentError.append('<h4>no result for "' + $searchInput + '"</h4> <h5> WE COULDNOT FIND ANY RESULTS FOR " ' + $searchInput + '" - PLEASE TRY AGAIN');
                                //      $('#movies h2').hide();
                                //      $('#series h2').hide();
                                //  }

                            });
                    });

                });
