

blocksConfig.carrousel={
    "template": "/templates/blocks/carousel.html",
    "internalDependencies":["/src/modules/rubedoBlocks/controllers/CarouselController.js"]
};

blocksConfig.releaseList={
    "template": "/templates/blocks/releaseList.html",
    "internalDependencies":["/src/modules/rubedoBlocks/controllers/ReleaseListController.js"]
};

blocksConfig.multiCarrousel={
    "template": "/templates/blocks/multiCarrousel.html",
    "internalDependencies":["/src/modules/rubedoBlocks/controllers/MultiCarrouselController.js"],
    "externalDependencies":['/components/OwlFonk/OwlCarousel/owl-carousel/owl.carousel.min.js']
};

blocksConfig.contentDetail= {
    "template": "/templates/blocks/contentDetail.html",
        "internalDependencies":["/src/modules/rubedoBlocks/controllers/ContentDetailController.js","/src/modules/rubedoBlocks/directives/DisqusDirective.js"],
    "externalDependencies":['/components/OwlFonk/OwlCarousel/owl-carousel/owl.carousel.min.js']
};

angular.module("rubedoBlocks").directive('persoContentLink',["RubedoContentsService","RubedoPagesService",function (RubedoContentsService,RubedoPagesService) {
    return {
        link: function (scope, element, attrs) {

            var options = {
                siteId: scope.rubedo.current.site.id,
                pageId: scope.rubedo.current.page.id
            };
            var contentId=attrs.content;
            RubedoPagesService.getPageById(attrs.page).then(function(response){
                if (response.data.success){
                    var destinationPage=response.data.url;
                    if (contentId&&contentId!=""){
                        RubedoContentsService.getContentById(contentId, options).then(
                            function(response){
                                if (response.data.success){
                                    var cannonical=response.data.content.canonicalUrl;
                                    var cutUrl=cannonical.substring(cannonical.indexOf(response.data.content.id));
                                    attrs.$set("href",destinationPage+"/"+cutUrl+'?taxonomies={"artists":["'+response.data.content.id+'"]}');
                                    element.html(response.data.content.fields.text);
                                }
                            }
                        );
                    }
                }
            });



        }
    };
}]);
angular.module('rubedo').config(function($sceProvider) {
    $sceProvider.enabled(false);
});