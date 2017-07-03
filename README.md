# Rutgers Unaffiliated Course Tool
## Objective
Rust serves to create a more intuitive, user-friendly way to search for classes offered at Rutgers University. Instead of searching courses based on a single subject code, this application allows a broad search of Rutgers schools, subjects, and courses. Rust search results also include multiple semesters, as some classes are only offered at a certain time of the year.
## Project structure
In order to retrieve, organize, and present the data, this project is divided into three sub-modules: ru-query, scraper, and rust-app.
### ru-query
This module provides an interface for the [Rutgers SoC API](http://sis.rutgers.edu/soc/). It's primary purpose is to abstract the interaction between the scraper module and the SoC API endpoints.
### scraper
This module is a node.js CLI program that retrieves Rutgers data and saves it to a MongoDB database (hosted using [mLab](https://mlab.com/)). Using the ru-query module, it queries data from the SoC api for Rutgers schools, subjects, and courses. This data is then added to (or updated on) the mLab database.
### rust-app
This module contains the client-side code (built with Angular 2), as well as an API for retrieving data stored in Rust's MongoDB database.
