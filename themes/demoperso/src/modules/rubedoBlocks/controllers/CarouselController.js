angular.module("rubedoBlocks").lazy.controller("CarouselController",["$scope","RubedoContentsService",function($scope,RubedoContentsService){
    var me=this;
    me.contents=[];
    var blockConfig=$scope.blockConfig;
    var queryOptions={
        start: blockConfig.resultsSkip ? blockConfig.resultsSkip : 0,
        limit: blockConfig.pageSize ? blockConfig.pageSize : 6,
        'fields[]' : ["text","summary",blockConfig.imageField]
    };
    if (blockConfig.imageField && blockConfig.imageField!="") {
    	queryOptions['requiredFields[]'] = [blockConfig.imageField];
    }
    if(blockConfig.singlePage){
        queryOptions.detailPageId = blockConfig.singlePage;
    }
    var pageId=$scope.rubedo.current.page.id;
    var siteId=$scope.rubedo.current.site.id;
    $scope.isArray = angular.isArray;
    me.getContents=function(){
        RubedoContentsService.getContents(blockConfig.query,pageId,siteId, queryOptions).then(
            function(response){
                if (response.data.success){
                    me.contents=response.data.contents;
                    setTimeout(function(){me.initCarousel();},100);
                }
            }
        );
    };
    me.initCarousel=function(){
        setTimeout(function(){
            jQuery(function($) {

                //#main-slider
                $(function(){
                    $('#main-slider.carousel').carousel({
                        interval: 8000
                    });
                });

                $( '.centered' ).each(function( e ) {
                    $(this).css('margin-top',  ($('#main-slider').height() - $(this).height())/2);
                });

                $(window).resize(function(){
                    $( '.centered' ).each(function( e ) {
                        $(this).css('margin-top',  ($('#main-slider').height() - $(this).height())/2);
                    });
                });

                //portfolio
                $(window).load(function(){
                    $portfolio_selectors = $('.portfolio-filter >li>a');
                    if($portfolio_selectors!='undefined'){
                        $portfolio = $('.portfolio-items');
                        $portfolio.isotope({
                            itemSelector : 'li',
                            layoutMode : 'fitRows'
                        });
                        $portfolio_selectors.on('click', function(){
                            $portfolio_selectors.removeClass('active');
                            $(this).addClass('active');
                            var selector = $(this).attr('data-filter');
                            $portfolio.isotope({ filter: selector });
                            return false;
                        });
                    }
                });

                //contact form
                var form = $('.contact-form');
                form.submit(function () {
                    $this = $(this);
                    $.post($(this).attr('action'), function(data) {
                        $this.prev().text(data.message).fadeIn().delay(3000).fadeOut();
                    },'json');
                    return false;
                });

                //goto top
                $('.gototop').click(function(event) {
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: $("body").offset().top
                    }, 500);
                });

                //Pretty Photo
                $("a[rel^='prettyPhoto']").prettyPhoto({
                    social_tools: false
                });
            });
        }, 300);
        $scope.clearORPlaceholderHeight();
    };
    me.getImageOptions=function(){
        return({
            height:blockConfig.imageHeight,
            width:blockConfig.imageWidth ? blockConfig.imageWidth : angular.element("#block"+$scope.block.id).width(),
            mode:blockConfig.imageResizeMode
        });
    };
    if (blockConfig.query){
        me.getContents();
    }
}]);