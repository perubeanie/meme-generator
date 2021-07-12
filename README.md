# Exam #1234: "Meme Generator"
## Student: s292507 PERUGINI LEONARDO 

## React Client Application Routes

- Route `/`: if a user is logged in it lists all public and protected memes, if not it lists only the public memes
- Route `/memeDescription`: it shows the selected meme with its properties
- Route : redirects the user to the list of memes


## API Server

#### LogIn

- POST `/api/login`
  - request body content: credentials of the user to be logged in

``` JSON
[
  {
    "username":"drake_bird@lib.it",
    "password":"bird01"
  }
]
```
- response body content: authenticated user

``` JSON
{
  "id": 2,
  "email": "drake_bird@lib.it",
  "name": "Drake"
}
```

#### Check if user is logged in

- GET `/api/user/current`
- request body: none
- response body: authenticated user

```JSON
{
  "id": 2,
  "username": "drake_bird@lib.it",
  "name": "Drake"
}
```

#### Logout

- DELETE `/api/logout/current`
- request parameters and request body content: none
- response body content: none

#### Retrieve all memes

- GET `/api/memes`
  - request parameters and request body content : none
  - retrieve a json object containing all the memes

Ex:
``` JSON
 [
  {
    "id": 36,
    "title": "Jeans",
    "image": "Winnie",
    "visibility": "Public",
    "creator": "Mike",
    "sentence1": "Jeans",
    "sentence2": "Denim",
    "sentence3": null,
    "font": "Impact",
    "color": "Black",
    "copy": 0
  },
  {
    "id": 37,
    "title": "Soccer",
    "image": "CMM",
    "visibility": "Protected",
    "creator": "Mike",
    "sentence1": "Italy is better than England",
    "sentence2": "Denim",
    "sentence3": null,
    "font": "Arial",
    "color": "Red",
    "copy": 0
  }
 ]
```

#### Retrieve all public memes

- GET `/api/publicMemes`
  - request parameters and request body content : none
  - retrieve a json object containing all the public memes

Ex: 
``` JSON
[
  {
    "id": 36,
    "title": "Jeans",
    "image": "Winnie",
    "visibility": "Public",
    "creator": "Mike",
    "sentence1": "Jeans",
    "sentence2": "Denim",
    "sentence3": null,
    "font": "Impact",
    "color": "Black",
    "copy": 0
  },
  {
    "id": 46,
    "title": "Mondays",
    "image": "Fry",
    "visibility": "Public",
    "creator": "Drake",
    "sentence1": "Is it me that hates mondays",
    "sentence2": "or do mondays hate me",
    "sentence3": null,
    "font": "Impact",
    "color": "White",
    "copy": 0
  }
]
```
  
#### Delete a meme

- DELETE `/api/memes/deleteMeme/:id`
- request parameters: id of the meme to be deleted

Ex: DELETE `/api/memes/deleteMeme/1`
- Response body: an empty object


#### Create a meme

- POST `/api/memes/createMeme`
- request body content:  description of the object to add

Ex:
``` JSON
[
  {
   "title":"Space",
   "image":"Fry",
   "visibility":"Public",
   "sentence1":"YES",
   "sentence2":"SIR",
   "sentence3":"!",
   "font":"Impact",
   "color":"White",
   "copy":0
  } 
]
```
- response body: none

## Database Tables


- Table `creators` - This table is used to store all the information about the meme creators and it contains: id, email, name, hash(of the password)
- Table `memes` - This table is used to store all the information about the memes and it contains: id, title, image(background image), visibility, creator, sentence1, sentence2, sentence3, font(of the text), color(of the text), copy(if it is a copied(1) or non-copied meme(0))


## Main React Components

- `Navigation`(in `Navigation.js`): navigation top bar, used to login/logout users, the navbar brand is a link to the home page
- `Logout`(in `Navigation.js`): button to logout a user
- `MemeTable`(in `MemeList.js`): it's the table the contains all the memes
- `MemeRow`(in `MemeList.js`): it renders a single row of the table and it shows the meme title, visibility, creator, and it's status. It has also a copy button and a deleteButton: the first one is enabled if the user is logged and the other one is enabled only if both the user is logged in and he created that meme.
- `AddCopyMeme` (in `MemeForms.js`): it contains the modal which lets the authenticated user create or copy a new meme. It can be rendered from the copy button or the add button in the home page. If you are creating a new meme the text boxes will be rendered only after you selected an image.
- `DeleteModal`(in `MemeForms.js`): it shows a form to confirm the deletion of a meme
- `MemeDescription`(in `MemeDescription.js`): it renders the complete meme on the left side of the page with its properties and the copy and delete button on the right side.
- `LoginForm`(in `Login.js`): it renders a form with some validation to let the user log in 
- `Button`(in `App.js`): this button triggers the modal to create a new meme. It's disabled if the user is not logged in
- `Toast`(in `App.js`): it is rendered any time there is an error interacting with the db.
  

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](./client/createMeme.png)

## Users Credentials

| username                 | password  | name  | id  |
| ------------------------ | --------- | ----- | --- |
| mikebell@polito.it       | webapp    | Mike  | 1   |
| drake_bird@lib.it        | bird01    | Drake | 2   |
| cirotiraggiro@hotmail.it | azzurri21 | Ciro  | 3   |


Memes by Mike: 
- Jeans(public, from scratch)
- Soccer(protected, from scratch)
- Freddie Mercury(Protected, copy)

Memes by Drake:
- Mondays(public, from scratch)
- YouTube Kids(protected, from scratch)
- Brain Surgeon(protected, copy)

Memes by Ciro:
- Sleep(public, from scratch)
- Mask(protected, from scratch)
- Sarcasm(public, copy)