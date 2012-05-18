COMPRESS=shrinksafe
NAME=vcardjs-`cat VERSION`

.PHONY: build
build: src/*.js
	cat build/head src/*.js build/tail > dist/$(NAME).js
	$(COMPRESS) dist/$(NAME).js > dist/$(NAME).min.js

release: build
	rm -f dist/latest.js
	ln -s $(NAME).min.js dist/latest.js
