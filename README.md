
# Platypus Tracker

## Motivation

I wanted to create a way to easily organize my job search. So I made a react app with a backend in node that did some cool things.

## What it is

The main page is a calendar where you can click on days and add notes for yourself, like to do items. The meetups and jobs tab scrape data from meetup.com and linkedin/builtinaustin respecitively. You can send meetups to your calendar in order to remember to go, and you can save jobs for yourself later. You can also send jobs to the email page and import saved template files to help automate emailing. The contacts page allows you to access contacts and also can send items to the email tab.

The email page is the really cool part. It allows you to send delayed emails, add files, and also populate emails from those saved templates you can make. The saved template will pull key words from job postings to make it easier to reuse boilerplate form letters.

As one nifty side feature you can navigate by voice command. Try saying 'go to calendar' when you are on a different tab!

## How to run

1. Clone the repo

2. Install all the dependencies

3. Navigate into the backend folder and add a .env file. In the file write "platypus_tracker_db_conn=<YOURFAVORITEMONGODBDATABASEGOESHERE>". I used a free mlab sandbox for this app.

4. Navigate into the backend file and npm start, navigate into the main file and npm start (different ports for front-end/back-end)

5. Go to the front end in the browser!

## Screen Shots of it in Action

Here is a picture of the calendar page

![Screenshot](/screenshots/platypustrackercalendar.png?raw=true "Calendar Page")

Here is a picture of the email page

![Screenshot](/screenshots/platypustrackeremail.png?raw=true "Calendar Page")

Here is a picture of the scraper page

![Screenshot](/screenshots/platypustrackerscraper.png?raw=true "Calendar Page")
