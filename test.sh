#!/bin/bash

cd tests
tsc
cd ..
./node_modules/.bin/mocha tests/tests/*.spec.js
exit 0
