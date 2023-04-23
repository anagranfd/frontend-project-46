install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

fix:
	npx eslint . --fix

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

jsondiff:
	node bin/gendiff.js /home/anagran/frontend-project-46/__fixtures__/file1.json /home/anagran/frontend-project-46/__fixtures__/file2.json

help:
	node bin/gendiff.js -h