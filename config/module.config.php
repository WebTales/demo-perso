<?php
return array(
    'templates' => array(
        'themes' => array(
            'demoperso' => array(
                'label' => 'Demoperso',
                'basePath' => realpath(__DIR__ . '/../themes/demoperso'),
                'noBootstrap'=>true,
                'css' => array(
                    "/css/bootstrap.min.css",
                    "/css/font-awesome.min.css",
                    "/css/prettyPhoto.css",
                    "/css/animate.css",
                    "/css/main.css",
                    "/css/integration.css"

                ),
                'js' => array(
                    "/js/bootstrap.min.js",
                    "/js/jquery.prettyPhoto.js",
                    "/js/blockDefinitions.js",
                )
            ),
        )
    ),
    'blocksDefinition' => array(
        'multiCarrousel' => array(
            'maxlifeTime' => 60,
            'definitionFile' => realpath(__DIR__ . "/blocks/") . '/multiCarrousel.json'
        ),
        'rcCarrousel' => array(
            'maxlifeTime' => 60,
            'definitionFile' => realpath(__DIR__ . "/blocks/") . '/rcCarrousel.json'
        ),
        'releaseList' => array(
            'maxlifeTime' => 60,
            'definitionFile' => realpath(__DIR__ . "/blocks/") . '/releaseList.json'
        ),
        'searchResults' => array(
            'maxlifeTime' => 60,
            'definitionFile' => realpath(__DIR__ . "/blocks/")  . '/searchResults.json'
        ),
        'recommendedContents' => array(
            'maxlifeTime' => 60,
            'definitionFile' => realpath(__DIR__ . "/blocks/")  . '/recommendedContents.json'
        ),
    ),
);
