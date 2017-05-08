# Single Resource API

## For this iteration of my car API I have implemented persistent storage using the file system.

#### This is a single resource api built using vanilla javascript. For this lab assignment I've created a model constructor based on cars that will let you create an api resource containing a car with a name, car type property and unique id.

##How to use:

#### To try out the api go to the terminal and launch the server
#### Once the server is launched type the following to post a car:

* http POST localhost:{PORT}/api/auto name="{Enter Car manufacturer name}" car="{Enter car model}"

#### To GET a car type:

* http localhost:{PORT}/api/auto?id={ID number}

#### To UPDATE a car type:

* http POST localhost:{PORT}/api/auto id={Enter existing ID} name="{Enter Car manufacturer name}" car="{Enter car model}"

#### To DELETE a car type:

* http DELETE localhost:{PORT}/api/auto id={Enter existing ID}
