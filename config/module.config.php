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
                    "/css/integration.css",
                    "https://fonts.googleapis.com/css?family=Raleway"
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
        )
    ),
);
