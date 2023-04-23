install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

fix:
	npx eslint . --fix

jsondiff:
	node bin/gendiff.js /home/anagran/frontend-project-46/__fixtures__/file1.json /home/anagran/frontend-project-46/__fixtures__/file2.json

help:
	node bin/gendiff.js -h