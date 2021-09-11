# RetentionX Frontend Challenge
### To run the app with React scripts

1. Execute `npm install` in the root folder of the challenge.
2. Execute `npm start` to host the React application on http://localhost:3000.

### Important notes before you start

1. This application uses 3 different API's;
    - **https://www.fruityvice.com/api/fruit/all**
    - **Pexel image search**
    - **https://api.spoonacular.com**

- Although it is free, fruityvice API does not allow cross domain requests from https://localhost:3000. Therefore I used https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc (Moesif CORS Chrome Extension) while developing this challenge. Or you can use https://cors-anywhere.herokuapp.com while fetching data (I commented that line out)
- Pexel image search limits their API by 200 calls per hour. Since we retreive 20+ images on one go, it might exceed its limit pretty fast.

### File Structure
- **src/Components** -> Sibling components that create the application
- **src/App.js** -> Parent component
- **src/Components/CustomSpinner.js** -> Custom spinner to show while retreiving data from different API's
- **src/Components/FruitCards.js** -> Main cards that are appended to body after retreiving data
- **src/Components/NutritionFacts.js** -> Little boxes inside of cards that hold nutritional values
- **src/Components/SkeletonPlaceholder.js** -> Just to show empty boxes while retreiving data about fruits to improve user experience
- **src/App.scss** -> Main styles of the application
- **src/index.js** -> Entry point of the application
- **src/Helpers.js** -> A simple function to capitalize first letter of strings
