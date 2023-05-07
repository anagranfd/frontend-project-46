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

json:
	node bin/gendiff.js /home/anagran/frontend-project-46/__fixtures__/file1.json /home/anagran/frontend-project-46/__fixtures__/file2.json

yaml:
	node bin/gendiff.js /home/anagran/frontend-project-46/__fixtures__/file1.yml /home/anagran/frontend-project-46/__fixtures__/file2.yml

s-json:
	node bin/gendiff.js --format stylish /home/anagran/frontend-project-46/__fixtures__/file1.json /home/anagran/frontend-project-46/__fixtures__/file2.json

s-yaml:
	node bin/gendiff.js --format stylish /home/anagran/frontend-project-46/__fixtures__/file1.yml /home/anagran/frontend-project-46/__fixtures__/file2.yml

p-json:
	node bin/gendiff.js --format plain /home/anagran/frontend-project-46/__fixtures__/file1.json /home/anagran/frontend-project-46/__fixtures__/file2.json

p-yaml:
	node bin/gendiff.js --format plain /home/anagran/frontend-project-46/__fixtures__/file1.yml /home/anagran/frontend-project-46/__fixtures__/file2.yml

help:
	node bin/gendiff.js -h