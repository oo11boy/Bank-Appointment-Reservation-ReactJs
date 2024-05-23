# Bank Appointment Booking System

This project is a React.js application that allows users to book appointments at a bank for a specific day and time. The appointment details are stored in a MySQL database using PHP and SQL. The system also provides administrative access for managing appointments.

< NEED VPN > **Demo:** [View Demo](https://bankrez.vercel.app/) < NEED VPN >

## Features

- **Book Appointment:** Users can select a specific date and time to book an appointment.
- **Delete Appointment:** Users have the option to delete their booked appointments.
- **User Registration and Login:** Users can register for an account and log in to manage their appointments.
- **Admin Dashboard:** Administrators have access to a dashboard to view and manage all appointments.
- **Responsive Design:** The application is designed to be fully responsive and works well on various devices.

## Technologies Used

- **Frontend:** React.js
- **Backend:** PHP
- **Database:** MySQL

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- A web server with PHP and MySQL support (e.g., XAMPP, WAMP, LAMP)
- MySQL database

### Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/yourusername/bank-appointment-booking.git
    cd bank-appointment-booking
    ```

2. **Install frontend dependencies:**
    ```sh
    npm install
    ```

3. **Set up the MySQL database:**
    - Create a MySQL database named `appointment_db`.
    - Import the provided `database.sql` file to set up the required tables.
    - Update the database configuration in the `backend/config.php` file with your MySQL credentials.

4. **Start the React development server:**
    ```sh
    npm start
    ```

5. **Start the backend server:**
    - Ensure your PHP server is running and pointed to the `backend` directory.

## Usage

- Open your web browser and navigate to `http://localhost:3000` (or your configured port) to access the application.
- Use the interface to book and manage appointments.
- Administrators can log in to access and manage all booked appointments.

## Project Structure

- `src/` - Contains the React.js source code.
- `backend/` - Contains PHP scripts and configurations for handling database interactions.
- `public/` - Contains public assets and the main HTML file.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.

## Contact

For any questions or suggestions, please reach out to [your-email@example.com].

