![cf](https://i.imgur.com/7v5ASc8.png) Lab 07 Cowsay HTTP
======

# About
This program allows users to store information regarding the name, type, and cost of a food item. The program utilizes REST principles to POST, GET, DELETE, and update entries, given custom user input. This program runs in the user's terminal on `localhost:3000`. Please enjoy!

# Directions
1. First, `npm i` to download all resources onto the local machine.
2. In terminal, run files using `nodemon server`.
3. In a separate terminal tab, enter entries.
  * To run POST, type into command line:
```
http POST :3000/api/food name=<food name> type=<item type> cost=<amount>
```
* To run GET, type into command line:
```
http GET :3000/api/food?id=<id-number>
```
* To run PUT, type into command line:
```
http PUT :3000/api/food?id=<id-number> name=<updated food name> type=<updates item type> cost=<updates amount>
```
  * Use one, two, or all of update categories

* To run DELETE, type into command line:
```
http DELETE :3000/api/food?id=<id-number>
```
* Improper requests will render a 'Bad Request' 400 status, or 404 status.
