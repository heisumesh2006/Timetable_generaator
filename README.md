🕒 University Timetable Generator (Full-Stack Web App)
This is a full-stack University Timetable Generator project that dynamically generates weekly timetables for multiple sections based on subject credits, lab hours, teacher assignments, and batch-based lab allocation. Built using React, Node.js, and MongoDB, it helps automate the complex task of creating optimized timetables.

🚀 Features
📋 Input form for subjects, teachers, credits, and lab hours

🔁 Automatic distribution of theory classes based on subject credits

🧪 Lab allocation in 2-hour blocks, per batch per section

⏱️ Break insertion (Tea break at 11:00 AM, Lunch break at 1:15 PM)

👨‍🏫 Teacher clash prevention across sections

📚 Multi-section support (e.g., Section A, B, C)

🔐 User authentication using JWT

💾 Timetable data saved in MongoDB

📊 Display of timetable in a structured weekly grid

🛠️ Technologies Used
🌐 Frontend
React.js

Axios

Tailwind CSS (optional)

🔙 Backend
Node.js

Express.js

MongoDB with Mongoose

JWT for Authentication

Tools
Google Colab (for initial logic testing)

Postman (API testing)

Git & GitHub

VS Code

📦 Installation & Setup
Step 1: Clone the repository
bash
Copy
Edit
git clone https://github.com/your-username/timetable-generator.git
cd timetable-generator
Step 2: Backend Setup
bash
Copy
Edit
cd server
npm install
Create a .env file inside the server folder:

ini
Copy
Edit
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/finaltimetable
JWT_SECRET=your_jwt_secret
Start the backend server:

nginx
Copy
Edit
node server.js
Step 3: Frontend Setup
bash
Copy
Edit
cd client
npm install
npm start
🧠 Timetable Logic Overview
Subjects with 3 credits are split across 3 days (1 hour each).

Labs are scheduled for 2-hour blocks and divided into 3 batches.

Time slots:

Morning: 9:00 AM – 1:15 PM (with 11:00 AM tea break)

Afternoon: 2:00 PM – 4:00 PM (labs)

Each section (A, B, C) is treated separately, but teacher clashes are prevented.

🔑 Example Credentials
Use these to test login functionality:

makefile
Copy
Edit
Email: test@example.com
Password: test123
Or register a new account from the app.

📁 Project Structure
bash
Copy
Edit
timetable-generator/
├── client/             # React frontend
│   ├── components/
│   ├── pages/
│   └── App.js
│
├── server/             # Node.js backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── server.js
│
└── README.md
📸 Sample Screenshots
Add screenshots of the form input page and generated timetable here if available.

✅ Python Requirements (if Colab logic is used)
If you used Colab for testing, install these:

nginx
Copy
Edit
numpy
pandas
matplotlib
✍️ Author
Umesh A.
GitHub: https://github.com/your-username
Project developed as part of academic mini-project.

📄 License
This project is licensed under the MIT License. You are free to use, modify, and distribute it for educational or personal purposes.
