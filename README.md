
# The BS Converter

The BS Converter is a web application that allows users to convert songs' BPM (Beats Per Minute) to SPM (Strokes Per Minute). It fetches song data from Spotify and matches it with custom SPM data for different types of workouts or activities, making it easier to find songs with rhythms that match a specific cadence.

## Features

- Enter a Spotify song or playlist URL to get BPM and SPM information.
- Converts BPM to SPM based on user-defined mappings.
- Displays song details and SPM recommendations.
- Allows users to view request history and revisit past conversions.

## Project Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/ben-is-jammin/the-bs-converter.git
   cd the-bs-converter
   ```

2. **Install Dependencies**

   Ensure you have [Node.js](https://nodejs.org/) installed, then run:

   ```bash
   npm install
   ```

3. **Environment Variables**

   Create a `.env` file in the root directory to store your environment variables. Here’s an example of the required variables:

   ```plaintext
   REACT_APP_SPOTIFY_CLIENT_ID=your_spotify_client_id
   REACT_APP_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   REACT_APP_AIRTABLE_API_KEY=your_airtable_api_key
   REACT_APP_AIRTABLE_BASE_ID=your_airtable_base_id
   ```

   Replace each `your_*` with your actual API keys.

4. **Run the Development Server**

   ```bash
   npm start
   ```

   The app should now be running on `http://localhost:3000`.

5. **Build for Production**

   To create an optimized production build, run:

   ```bash
   npm run build
   ```

   This will create a `build` folder with the production-ready code.

## Deployment on GitHub Pages

1. **Install the GitHub Pages package as a dev dependency**

   ```bash
   npm install gh-pages --save-dev
   ```

2. **Update `package.json`**

   In `package.json`, add the following fields:

   ```json
   "homepage": "https://<your-github-username>.github.io/the-bs-converter"
   ```

   Under `scripts`, add:

   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```

3. **Deploy**

   Run:

   ```bash
   npm run deploy
   ```

   Your app will now be deployed to GitHub Pages.

## Technologies Used

- **React**: Frontend library
- **Spotify API**: Fetches song data
- **Airtable API**: Manages custom BPM-to-SPM data
- **GitHub Pages**: Deployment

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/ben-is-jammin/the-bs-converter/issues) if you want to contribute.

## Acknowledgments

Thanks to the open-source community for the tools and resources that make projects like this possible.
