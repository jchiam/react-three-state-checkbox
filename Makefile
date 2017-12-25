pretest:
	yarn install --ignore-scripts

test:
	node_modules/.bin/jest --coverage --ci --testResultsProcessor="jest-junit"

posttest:
	node_modules/.bin/codecov -t ${CODECOV_TOKEN}
	rm -rf coverage
