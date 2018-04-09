# Canvas Creations
## A full-scale dynamic webapplication built to showcase HTML5 Canvas projects from different users

This site was built and styled from the ground up using using the following techniques and features. The site has also been integrated to a live website hosted on heroku using mLab as the mongoDB solution. Check it out in the link above!

## Noteable Features
- RESTful routing convention followed for all routes
- Custom middleware in addition to the npm package passport for local authentical
- All CRUD operations available for both creations (posts) and comments linked to those creations
    - For Create options, a user must be signed in with their account
    - Read operations can be done when not signed in
    - Update and Destroy operations can only be performed by the user who owns the particular creation/comment
- Full support for creating user accounts and logging in/out
- Flash messages to let the user know about various successes or errors
- Styling uses the Semantic-UI framework
- Smart re-routing to help prevent errors from crashing the site
- Both Creations and Comments are associated with the User who created them


## Notable Technologies
- Node.js
- Express
- EJS (view engine)
- Mongoose
- Passport
- Semantic-UI
- Connect-flash