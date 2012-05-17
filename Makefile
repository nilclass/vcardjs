COMPRESS=shrinksafe

build: src/*.js
	$(COMPRESS) src/*.js > dist/vcard-`cat VERSION`.min.js

release: build
	rm -f dist/latest.js
	ln -s vcard-`cat VERSION`.min.js dist/latest.js
