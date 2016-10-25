angular.module("rubedoBlocks").lazy.controller("MultiCarrouselController",["$scope","RubedoContentsService","RubedoPagesService",function($scope,RubedoContentsService,RubedoPagesService){
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
        $("#block"+$scope.block.id).owlCarousel({
            autoPlay: 3000, //Set AutoPlay to 3 seconds
            items : 4,
            itemsDesktop : [1199,3],
            itemsDesktopSmall : [979,3]

        });
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
    if (blockConfig&&blockConfig.latestReleasesPage&&mongoIdRegex.test(blockConfig.latestReleasesPage)){
        RubedoPagesService.getPageById(blockConfig.latestReleasesPage).then(function(response){
            if (response.data.success){
                me.latestReleasesPageUrl=response.data.url;
            }
        });
    }
}]);