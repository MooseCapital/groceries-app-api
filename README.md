## project name
go here to write a good readme https://readme.so/editor
```
put code in 3 backticks to be copyable
```


1. Create a new empty project in webstorm
2. go to the git tab on the bottom, and create a local repo. 
3. at the top toolbar click git -> git branches, now create a *test* branch. This is safer and best practice to only commit important updates on main.
4. go to git -> manage remotes, now add the ssh/http link to this repo
5. on the git tab at the bottom, click fetch remotes, this adds all the files locally
6. now right-click the most recent remote commit from the *testing* branch and "revert current branch to here".
7. we pick "accept theirs" to all files. Now remove any files left over and not in use
8. go back to git at the top and manage remotes, remove this repo from our new project
9. add the remote ssh branch link to our new project
10. Main and test local branches should be at the same commit, and we should only have one. 
11. for good practice, use "test" branch daily, then when we have important updates, use the main

## npm config run scripts
1. At the NPM config at the top, click "edit configurations", then add NPM from the list
2. make sure to add the "dev" and "preview script" each, to start a local server with 
1 click to the green arrow

## remove commits
when we have many commits and only want to show one, we have simply instructions
```jsx
rm -rf .git
```
```jsx
git init
```
```jsx
git add .
```
```jsx
git commit -m "Initial commit"
```

