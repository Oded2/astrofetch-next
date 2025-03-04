# AstroFetch

[![Netlify Status](https://api.netlify.com/api/v1/badges/a674a9f0-dff6-4c5b-98e0-1165d950387c/deploy-status)](https://app.netlify.com/sites/astrofetch/deploys)

AstroFetch is a Next.js-based web application that allows users to explore NASA's Astronomy Picture of the Day (APOD). With AstroFetch, users can easily access and view images and descriptions from the APOD archive, either by selecting a specific date or by fetching a range of dates. The interface is clean, interactive, and built with modern technologies for an engaging experience.

## Features

- **Home Page:** The landing page with two options to start exploring APOD:

  - **Date Range Fetcher:** Select a date range, and fetch all the APODs between those dates, displayed in a grid.
  - **Quick Fetch:** Select a specific date to view the APOD for that day.

- **View Page:** Displays the selected APOD for a specific date, showing the image/video, title, and description.

- **Range Page:** Displays APODs for the selected date range in a grid, with each APOD having its own card that includes an image, title, description, and share options.

- **Responsive Design:** Built to work on various devices with a smooth experience.
- **Share and View:** Users can view the image and easily share the content with others.

## Technologies Used

- **Next.js:** A React framework for building static and dynamic web pages with server-side rendering.
- **Tailwind CSS 4:** A utility-first CSS framework used to build a responsive and customizable layout.
- **DaisyUI 5:** A component library built on top of Tailwind CSS, providing a set of pre-designed components to speed up the development process.

## Installation

To run AstroFetch locally, follow these steps:

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://npmjs.com) installed on your machine.

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/Oded2/astrofetch-next.git
   ```

2. Navigate to the project directory:

   ```bash
   cd astrofetch
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and go to `http://localhost:3000` to view the website.

## Usage

- **Home Page**: Upon loading the page, you will see two options:
  - **Date Range Fetcher:** Click to select a start and end date to fetch all the APODs in that range and view them in a grid layout on the Range Page.
  - **Quick Fetch:** Select a specific date to view the APOD for that day on the View Page.
- **View Page:** After selecting a specific date, you will be redirected to the View Page, where you can see the image/video, title, description, and share options for the selected APOD.

- **Range Page:** After selecting a date range, you'll be redirected to the Range Page, where you can view all APODs for the selected range in a grid layout. Each APOD card has options to view and share the content.

## API Integration

AstroFetch fetches data from NASA's [Astronomy Picture of the Day (APOD) API](https://api.nasa.gov/). The data fetched includes:

- Image or video URL
- Title and description of the APOD
- Date of the APOD

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
