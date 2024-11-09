# Recipe Ideas

A recipe Ideas application that allows users to search for recipes based on ingredients, dietary preferences, and exclusions (e.g., "no onion" or "no chicken"). This application uses the [TheMealDB API](https://www.themealdb.com/api.php) to fetch recipes.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Used Technologies](#used-technologies)
- [Installation](#installation)
- [API Reference](#api-reference)
- [Project Structure](#project-structure)
- [License](#license)

## Features

- **Ingredient-based search**: Find recipes based on ingredients you have.
- **Inclusion/Exclusion filters**: Include or exclude specific ingredients (e.g., "no onion").
- **Cuisine and Category filters**: Filter recipes by cuisine type (e.g., Indian, Italian) or category (e.g., Breakfast, Vegan).
- **mood filters**: Filter recipes by mood type (e.g., comfort,healthy,exotic) or category (e.g., Breakfast, Vegan).
- **Full Recipe Details**: View full recipe details, including ingredients, instructions, and an image.

## Getting Started

### Prerequisites

- **Node.js** and **npm** installed.
### Usage
  to use the application you can search for recipes by ingredients, cuisine, category, or mood. You can also include or exclude specific ingredients in your search. Click on a recipe card to view the full recipe details.
### Used Technologies
- **React.js**
- **react router dom**
- **shadcn/ui styled-components**
- **Tailwind css**

### Installation

1. Clone the repository:

   ```bash

   git clone https://github.com/codecomfortcc/recipe-ideas.git
   cd recipe-ideas
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
 3. Start the development server:
    ```bash
    npm run dev
    ```
3. Open [http://localhost:1573](http://localhost:3000) in your browser.

5. To build the application for production, use:

    ```bash
    npm run build
    ```


## API Reference
https://www.themealdb.com/api

## Project Structure
- **src**: This directory contains the source code of the application.
  - **components**: This directory contains reusable React components used in the application.
  - **pages**: This directory contains the main pages of the application.
  - **services**: This directory contains services for fetching data from the API.
  - **styles**: This directory contains global styles and CSS files.
- **public**: This directory contains static assets such as images and icons.
- **package.json**: This file contains the project's dependencies and scripts.
- **README.md**: This file contains the project's documentation.
- **.gitignore**: This file specifies files and directories that should be ignored by Git.
- **.eslintrc.json**: This file contains ESLint configuration settings.

## License
- *MIT License- MIT License*


