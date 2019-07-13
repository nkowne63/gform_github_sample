# prerequests

- install dependencies by `npm i`
- init env files by `npm run env:init`
- you need to enable clasp in your google account
  - access https://script.google.com/home/usersettings
  - then turn on `Google Apps Script API`
  - run `$(npm bin)/clasp login`
  - create google apps script project and copy the scriptId to `.clasp.json`'s `scriptId`
- you need to get token of your github account
  - access https://github.com/settings/tokens/new
  - then attach `repo` access
  - copy the token to `.env`'s `GITHUB_TOKEN`
- write target issue(`OWNER`/`REPO_NAME`/`ISSUE_NUMBER`) in `.env`
- exec `heroku login` and `heroku create`
- get url(exclude '/') and copy it to the `TARGET` in `.env`
- exec `npm run generate` to generate graphql type definition

# commands

## npm run generate
generate graphql type definition

## npm run pack
webapck both client(GAS) and server(express + apollo client)

## npm run deploy
deploy server to heroku
you need to `heroku login` and `heroku create` in current folder

## npm run push
deploy client to GAS