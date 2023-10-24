# Project Name: Docket Management System

## Overview
Docket Management System is a web application that allows users to manage events and dockets efficiently. Users can input event details such as name, start time, end time, hours worked, rate per hour, supplier, purchase order, and description. The application parses data from a CSV file, populates dropdown menus dynamically, and enables users to save events as dockets in a MongoDB database. It provides functionalities to view and manage dockets conveniently.

## Features
- **CSV Data Parsing:** The application parses data from a CSV file using the Papa Parse library, ensuring seamless integration of external data.
  
- **Dynamic Dropdowns:** Users can select suppliers and purchase orders dynamically. The dropdowns populate based on CSV data, enhancing user experience and data accuracy.

- **Event Creation:** Users can input event details via a form, creating dockets that are saved to the MongoDB database.

- **Database Integration:** Dockets are saved to the MongoDB database through a POST request, ensuring persistent data storage and retrieval.

- **Docket Display:** The application fetches dockets from the database using a GET request and dynamically displays them in a table format. This feature allows users to visualize and manage existing dockets.

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose ODM)
- **Libraries:** Papa Parse (for CSV parsing)
- **Middleware:** body-parser (for parsing request bodies), cors (for enabling Cross-Origin Resource Sharing)
- **Dependency Management:** npm (Node Package Manager)

## Installation
1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Start the server: `npm start`

Ensure MongoDB is running and accessible at the specified URI (configured in the `.env` file).

## Usage
1. Upload a CSV file using the application interface.
2. Select a supplier from the dropdown menu. Purchase order options will populate dynamically based on the selected supplier.
3. Fill out the event details form, including name, start time, end time, hours worked, rate per hour, and description.
4. Save the event as a docket, which will be stored in the MongoDB database.
5. View existing dockets in the table format displayed on the application interface.

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or create a pull request.

## License
This project is licensed under the [ISC License](LICENSE).

## Acknowledgements
- The project utilizes the [Papa Parse](https://www.papaparse.com/) library for CSV parsing.
- Special thanks to the open-source community for providing valuable tools and resources.

---
