# Welcome

This is a project which I have been building on the road to becoming a web developer.

It is primarily designed for people planning a trip to Munich and is designed to offer tips for sites and tours as well as long range forecasts and a concert search.

It is built using create-react-app, react-redux and firebase.

If you are interested please feel free to fork the repo and play around.

If you have any questions please do not hesitate to contact me cor@macbeagan.me

## Setup

```bash
npm install
```

## Usage

Use

```bash
npm start
```

to run local dev.

## Firebase

You will need to get credentials from Firebase and add them to a .env file in the root directory.
Then you can run

```bash
firebase login
```

and

```bash
firebase init
```

To get firebase up and running.

## Deployment

Run

```bash
npm run build
```

to generate the build files in the `/build/` directory.

Run

```bash
firebase deploy
```

to push to production contents from `/build/`

### Resources

The app is designed to use the following:
`Firebase Firestore` - for storing map entries and front page info boxes.
`Firebase Storage` - for storing images
`Firebase Hosting` - for hosting the site
`Songkick API` - for accessing concert data, it is free for students but you need to email and request an API key, they were very friendly and forthcoming [(details)](https://www.songkick.com/developer)
`Visual Crossing API` - for accessing long range weather statistics. You can sign up for an API key on their [website](https://www.visualcrossing.com/weather-api), the free tier gives you 1000 hits per day.

### Credits

The Date picker based on the work of [Rinas Musthafa](https://medium.com/swlh/build-a-date-picker-in-15mins-using-javascript-react-from-scratch-f6932c77db09) - note that there are accessibility issues with my design.

The dimension setter based on the work of `Lead Developer` [(StackOverflow)](https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react)

The photo carousel based on Ryan Florence's React Conf Speech 2018 [repo](https://github.com/ryanflorence/react-conf-2018)

### Licence

MIT © P. Cormac Beagan
