#!/bin/bash
npm ci
export LOG_TO_CMD="false"
export AWS_DEFAULT_REGION="eu-west-1"
export RUNONAWS="true"
./node_modules/.bin/mocha --reporter mocha-junit-reporter
mkdir -p tests-results
mv test-results.xml "tests-results/test_results_$(date +"%F-%T").xml"
