#!/bin/bash

## stash files,folders
git add -f .env .clasp.json src/github/generated
git stash
## commit and push
git checkout -b heroku
git stash apply
git commit -am 'deploy'
git push -f heroku heroku:master
## return and clear side effects
git checkout master
git branch -D heroku
git stash pop
git rm -r --cached .env .clasp.json src/github/generated
