# energy-config# energy-config

## Description
Tools to simulate the devices configure in a site.

## Improvement
** Take a pass at polishing the UI design
** Add transformers automatically when they are needed
** Include the improvements/bug fixes that you mentioned during our call (Color or + and - buttons, fix using Powerpack instead of transformer)

![record4](https://github.com/user-attachments/assets/e24ac876-746a-4024-969d-8ab19404af52)


** Do not fix the height of the layout, make it scale vertically as batteries are added

![record5](https://github.com/user-attachments/assets/3eee2199-5928-49c3-a5dc-0eee81026a09)




The user should be able to enter the number of each device they want, and your UI should show the price, land dimension required and the sites energy density
![record1](https://github.com/user-attachments/assets/11e37541-8f08-4ffe-857c-fe3fec010cfa)


- Assume that for every 4 industrial batteries bought 1 transformer is needed.
  
- The UI should also have an autogenerated layout showing an arrangement of batteries based on the user’s configuration
  ![record2](https://github.com/user-attachments/assets/a0265fb1-12e4-4c99-b6d2-03616b0159a2)

- The site layouts be able to configured and not exceed 100ft
![record3](https://github.com/user-attachments/assets/87f6ee29-fa05-44cc-95ff-bc94e5fc6091)

Addtional feature:
Use can move up/down the devices so it can adjust to fit in the space.
When the item is selected, the device in the right side layout is highlisted.

![record4](https://github.com/user-attachments/assets/ecdf36b1-c98a-49a4-ae73-ebabee9c1c80)

## Prerequisites
- [Node.js](https://nodejs.org/) 
- [npm](https://www.npmjs.com/)  or [yarn](https://yarnpkg.com/) 
- Any other dependencies or tools required

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/your-repo-name.git
    cd your-repo-name
    ```

2. Install dependencies:
    ```sh
    npm install
    ```
    or if you are using yarn:
    ```sh
    yarn install
    ```

## Running the App

1. Start the development server:
    ```sh
    npm start
    ```
    or if you are using yarn:
    ```sh
    yarn start
    ```

2. Open your browser and navigate to:
    ```
    http://localhost:8000
    ```

## Building for Production

1. Build the app for production:
    ```sh
    npm run build
    ```
    or if you are using yarn:
    ```sh
    yarn build
    ```

2. The production-ready files will be in the `build` directory.

## Running Tests

1. Run the tests:
    ```sh
    npm test
    ```
    or if you are using yarn:
    ```sh
    yarn test
    ```

## Additional Information

- Any additional steps or information that might be useful.

## License
Include your license information here.
