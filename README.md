## Review 

- The overall project structure seems fine, but it could benefit from more modularity and adherence to best practices, especially regarding separation of concerns.
- Some packages are outdated and could be vulnerable, posing security concerns.
- Secrets are stored within the code, leading to a significant security risk. These should not be committed to GitHub but instead stored in a .env file.
- There are occasional indentation issues; using Prettier could help maintain consistency.
- An extra ‘/’ in the API URL causes it to return a 404 error consistently.
- The search input is wrapped with a Link component, causing a backend API call with an empty search string when clicked, which doesn't serve any meaningful purpose. [Header.jsx Line: 33](https://github.com/sandeep-somi/movie-db/blob/master/src/components/Header.jsx)
- Currently, the App contains all the logic, including the router implementation. It would be better to separate the router into a config file and manage the logic within each route component, following the separation of concerns principle.
- Each route component (e.g., Home, Favourite, Watch Later, User Profile) could benefit from having a controller component, organized within a pages folder for better structure.
- Components like Movies, Movie, and YoutubePlayer can be treated as atomic components and placed inside the components folder, while the Header component could be part of a Layout folder, alongside other layout-related files like the Footer.
- Keeping test case files in the same folder as their corresponding components makes it easier to maintain and update tests as the project grows.
- Instead of placing the Provider in the index file, it would be clearer to have a separate file for the Provider.
- Test cases should be more descriptive to clearly state the purpose of each test suite.
- The use of inline executable functions in multiple places reduces code readability.
- The Movie component uses two map functions to show starred and watch later movies. This could be optimized by creating a hashmap of the starred and watch later movie IDs in the Redux slice. [Movie.jsx: line 30, line 47](https://github.com/sandeep-somi/movie-db/blob/master/src/components/Movie.jsx)
- CSS/SCSS files are not being stored in the style folder, which would help with organization.
- Code readability could be improved by integrating Prettier.

_Note: just an overview, in code level review, can pin point more details_
