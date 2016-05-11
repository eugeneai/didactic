.PHONY: gen run all

all: run

gen: 
	npm install express --save
	npm install express-handlebars
	
run:
	node server.js
	
