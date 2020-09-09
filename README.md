# RecipeApp
   `RecipeApp` is a web application where end users from different part of the world can visit the app and learn to make delicious food that is posted in this website. Users can also post their own recipe along with its image. 

### Dependencies
##### Install 
 1) `npm` package manager in your machine.
 2) `yarn` locally into `react-client`.

### Steps to run project
  1) Download the `RecipeApp` project. Go to project directory and run `npm install` on the command terminal. This will install `node_modules` (all dependencies specified in `package.json` file).
  2) Go to `react-client` directory and run `npm install` on the command terminal. This will install `node_modules` (all dependencies specified in `package.json` file) for `react-client`.
  3) Create a folder named `mongoDB/data` in the directory where you have saved the `RecipeApp` project. `Note` this folder will save all the db data's.

  ##### Database
   Create `Recipe` collection in mongoDB. 
   `Add` following documents:
        1. "recipes": [
            {
            "id": 0,
            "name": "Momos",
            "image": "images/momos.png",
            "category": "main",
            "ingredients": "Ground chicken/beef/trukey/prok, salt, trumeric powder, oilve oil, garlic, ginger, onion, coriander leaves, momo masala, coriander powder, dumpling wrapper",
            "featured": false,
            "direction": "Cut onion, garlic, ginger, coriander leaves into small pieces. Add them to the ground meat. Add rest of the ingredients and marinate them well. Make a small meat ball and wrap. Stem it in the steamer for 20 minutes. ",
            "description": "Hot and spicey mouthwatering dumpling made with ground meat and seasoned with garlic, ginger, onion and salt."
            },
            {
            "id": 1,
            "name": "Chicken Choyela",
            "image": "images/choyela.png",
            "category": "appetizer",
            "ingredients": "Baked chicken, salt, trumeric powder, oilve oil, green chilly, garlic, ginger, onion, coriander leaves",
            "featured": false,
            "direction": "Cut baked chicken, onion, garlic, ginger, coriander leaves into small pieces. Add all the ingredients and marinate them well.You are now ready to serve!",
            "description": "Appetizer that is made from baked crispy chicken and seasoned with garlic, ginger, onion, salt, green chilly, oilve oil and coriander leaves."
            },
            {
            "id": 2,
            "name": "Baked Potatoes",
            "image": "images/potatoes.png",
            "category": "appetizer",
            "ingredients": "Potatoes, salt, trumeric powder, black pepper, hot sauce, rosemary",
            "featured": false,
            "direction": "Microwave potatoes for 1 minute. Marinate with all the ingridents listed. Bake it at 450 degree till it is crispy.",
            "description": "Freshly baked hot crispy red potatoes ready to eat from an oven."
            },
            {
            "id": 3,
            "name": "Fish fry",
            "image": "images/fish.png",
            "category": "main",
            "ingredients": "Fresh raw fish, salt, trumeric powder, lemon juice, garlic and ginger paste",
            "featured": false,
            "direction": "Add the listed ingredients to the raw fish amd marinate them well. Fry in the oil till its crispy enough.",
            "description": "Dip fried fish goes with your choice of sauce."
            }
        ]
        2. "promotions": [
            {
            "id": 0,
            "name": "Paella",
            "image": "images/pot.png",
            "description": "Gravy rice with the combination of bread, shrimp, kalamari and peas."
            },
            {
            "id": 1,
            "name": "Ganjar halwa",
            "image": "images/halwa.png",
            "description": "Nepalese desert made from carrot, milk, nuts and butter."
            }
        ]
        3. "founders": [
            {
            "id": 0,
            "name": "Samikshya Adhikari",
            "image": "images/samikshya.png",
            "designation": "CEO",
            "description": "Samikshya is a computer engineer."
            }
        ]

### Running the project
 1) `mongoDB server` Go to mongoDB folder from your terminal and run `mongod --dbpath=data --bind_ip 127.0.0.1`. `127.0.0.1` is default port for mongoDB. Your `mongoDB` server is up and running.
 2) `Recipe srver `Go to RecipeApp project from your terminal and run `npm start`. Your `recipe` server is up and running.
 3) `Recipe client` Go to react-client folder from your terminal and run `yarn run`. Your `recipe client` is up and running.


