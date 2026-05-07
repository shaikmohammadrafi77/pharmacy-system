# Digital Pharmacy Management System

## Setup Instructions

### 1. Install Dependencies
```bash
cd pharmacy-system
npm install
```

### 2. Setup MongoDB
- Install MongoDB locally OR use MongoDB Atlas
- Update MONGODB_URI in .env file

### 3. Configure .env
Edit the `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/pharmacydb
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

### 4. Run the Project
```bash
npm start
# OR for development with auto-reload:
npm run dev
```

### 5. Open in Browser
```
http://localhost:5000
```

## Default Test Accounts (Register manually)
- Admin: role = admin
- Pharmacist: role = pharmacist  
- Customer: role = customer

## Features
- Admin Dashboard with Charts
- Pharmacist Prescription Verification
- Customer Medicine Browsing & Cart
- JWT Authentication
- Email Notifications
- File Upload for Prescriptions
