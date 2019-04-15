# Tryspecter App

#### Features
* Continuous scraping of the provided websites using their social links and data associated with that social links. This data will be saved in the database periodically so that, data can be further analyzed based on different measures like company performance, an increase in popularity over a period of time etc.
* Adapter design pattern for scrappers.
* Parallel processing of jobs in background for web scrapping.
* Cron job which will be responsible to store latest data in database periodically.
* Time interval for cron job and concurrency of background jobs can be configured using env files (**app.env**, **worker.env**).
* Background jobs are running in a separate container so they can be scalable if required later.

#### Components
###### 1. App Component:
This component is responsible for parsing the data from csv file and add data to redis queue jobs for processing. One configurable schedular is setup which takes care of pushing relevent jobs to redis.
###### 2. Worker Component:
Actual processing of queue jobs are done in this component. This component is separated from **app component** so scaling can be done in future, if required.
###### Redis:
Queue jobs are stored in redis container and **worker container** picks new jobs from redis whenever it is in idle state.
###### Postgres:
Scrapped data for different company domains is stored inside postgres container.

### Config Variables
* GET_URL_QUEUE_CONCURRENCY : number of concurrent background jobs to fetch social links for companies.
* GET_FB_INFO_QUEUE_CONCURRENCY : number of concurrent background jobs to fetch data from facebook page of companies.
* GET_TWITTER_INFO_QUEUE_CONCURRENCY : number of concurrent background jobs to fetch data from twitter page of companies.
* GET_LINKEDIN_INFO_QUEUE_CONCURRENCY : number of concurrent background jobs to fetch data from linkedin page of companies.
* SCHEDULAR_CRON_TIME : time in ms after which schedular start processing again.
* DOMAIN_FILE_NAME : CSV file which contains list of domains of companies.
* LINKEDIN_LOGIN_URL: contains linkedin login url

**Note:** All config variables are present in **app.js** file inside **config** folder.

### Scrapping Approaches
* **URLS with public access** : For these types of pages, used **axios** and **cheerio** npm package to fetch html content of web page and parse required data from that page. Examples of pages which do not required to login are **Twitter pages**, **Facebook pages**

* **URLS with private access** : For these types of pages, used **puppeteer** npm package to actually open the browser under headless mode and perform operations on browser e.g. login to linkedin and then fetch the html content of web page. Examples of pages which required to login are **Linkedin pages**

### Setup

1. In root folder, put a csv file that contains a list of domain names of companies, for reference one sample csv file (sample_domain.csv) added in root folder.
2. Put new csv file name as value of **DOMAIN_FILE_NAME** env variable present inside **app.env** file in envs folder.
3. Create one **.env** file in root folder of project and add following env variables.
```sh
    USERNAME=LINKEDIN_USERNAME
    PASSWORD=LINKEDIN_PASSWORD
```
3. From root folder, run below command to spin up all the containers:

```sh
    docker network create tryspecter
    docker-compose build
    COMPOSE_HTTP_TIMEOUT=200 docker-compose up -d
```

4. Run below command to check **app container** logs:
```sh
    docker logs -f app
```
5. Run below command to check **worker container** logs:
```sh
    docker logs -f worker
```
6. Run below command to check data stored in **postgres container**:
```sh
    docker exec -it postgres bash
    psql -U postgres -h postgres
    prompted to enter password: postgres
    \c tryspecter
    \dt
```

### Future Improvements
* Write **unit test** cases for models, scrappers etc.
* Write **integration test** cases for e2e testing of app.
* Multiple worker containers to enhance speed and performance of background jobs.
* List of credentials should be updated periodically, to avoid error due to blocking of credentials.
* Identify rate limiting of the third party websites based on IPs, so that IPs should not be blocked.