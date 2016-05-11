.PHONY: gen run all

all: run

gen: 
	npm install express --save
	
run:
	node server.js
	
