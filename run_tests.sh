#!/bin/bash
docker build -t test-image .
docker run --env LOG_TO_CMD=false --env AWS_DEFAULT_REGION=eu-west-1\
    --env RUNONAWS=true\
    --name test-container\
    test-image bash -c  "./node_modules/.bin/mocha --reporter mocha-junit-reporter --reporter-options mochaFile=/test_results.xml"

mkdir tests-results
docker cp test-container:/test_results.xml tests-results/
mv tests-results/test_results.xml "tests-results/test_results_$(date +"%F-%T").xml"  
exit $(docker inspect test-container --format='{{.State.ExitCode}}')