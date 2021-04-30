# PopSpot Currency Converter

A project which is used to get current exchange rates and convert them to multiple currencies using [Exchange Rates website](https://exchangeratesapi.io/)

---
## Requirements

For development, you will only need Node.js and a node global package, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###

## Configure API Key

Open `package.json` then edit the following according to the settings:

- EXCHANGE_RATE_API_KEY;
- EXCHANGE_RATE_URL;

## Running the project

    $ npm run start:dev

## Running the tests

    $ npm run test

## Running the lint

    $ npm run lint

## Run the project for the production

    $ npm run prod

## Additional Information

- Using **CHUNKS** in our process transaction API will cater the issue of 100 or more transactions
- Also we can go for the **CRON-JOB** technique for the above
- Import the `PopSpot.postman_collection.json` file into your postman and then hit the URLs to check the responses
- For sample **GITLAB-PIPELINES SWAGGER and DOCKER** files are attached, if we go for the deployments on AWS ECS services