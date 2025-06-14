# Automated Ticket Assignment System

A comprehensive ticket management system with automated assignment capabilities built with Django REST API backend and Next.js frontend.

## 🚀 Features

### What the System Does

This automated ticket assignment system provides:

- **Ticket Management**: Create, view, update, and delete support tickets
- **Automated Assignment**: Intelligent ticket assignment based on:
  - Priority levels (High priority tickets assigned to senior agents)
  - Agent availability (assigns to least busy senior agents)
- **Email Notifications**: Automatic email notifications to agents when tickets are assigned
- **User Management**: Admin can create accounts and manage agents
- **Priority-Based Routing**: High, Medium, and Low priority ticket handling


### System Architecture

- **Backend**: Django REST Framework (Python)
- **Frontend**: Next.js (React)
- **Database**: SQLite
- **Email Service**: SMTP configuration for notifications

## 📋 Database Schema

### Core Models

1. **User (Admin)**
   - Account creation and management
   - Authentication and authorization

2. **Agent**
   - Agent profiles (currently not users)
   - Availability status
   - Senior/Junior classification

3. **Ticket**
   - Title, Description
   - Priority (High, Medium, Low)
   - Status (Open, In Progress, Closed)
   

## 🛠️ Installation & Setup

### Prerequisites

- Python 3.8+
- Node.js 16+


### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/mutungapeter/Automated-ticketing-system.git
   cd Automated-ticketing-system
   ```

2. **Navigate to backend directory**
   ```bash
   cd backend
   ```

3. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate 
   ```

4. **Install requirements**
   ```bash
   pip install -r requirements.txt
   ```

5. **Configure environment variables**
   
   Create a `.env` file in the backend directory:
   ```env

   # Email Configuration
   EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USE_TLS=True
   EMAIL_HOST_USER=your-email@gmail.com
   EMAIL_HOST_PASSWORD=your-app-password
   DEFAULT_FROM_EMAIL=your-email@gmail.com
   

   ```

6. **Run database migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

7. **Create superuser (optional)**
   ```bash
   python manage.py createsuperuser
   ```

8. **Start the backend server**
   ```bash
   python manage.py runserver
   ```

   The backend will be available at `http://localhost:8000
    You can visit http://localhost:8000/apis/swagger, to interact with the endpoints via swagger documentation`
   

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Create environment file**
   
   Create a `.env` file in the frontend directory:
   ```env
   NEXT_PUBLIC_SERVER_URI=http://localhost:8000/apis
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Build the application**
   ```bash
   npm run build
   ```

5. **Start the frontend server**
   ```bash
   npm run start
   ```

   The frontend will be available at `http://localhost:3000`

## 🔧 Email Configuration

### Gmail Setup
1. Enable 2-Factor Authentication
2. Generate an App Password
3. Use the App Password in `EMAIL_HOST_PASSWORD`



## 🎯 Automated Assignment Rules

### Priority-Based Assignment
- **High Priority**: Assigned to senior agents only
- **Medium Priority**: Assigned to available senior agents, fallback to junior
- **Low Priority**: Assigned to any available agent


## 📧 Email Notifications

Agents receive email notifications when:
- A new ticket is assigned to them
- Ticket priority changes


## Usage

1. **Admin Dashboard**: Create and manage agent profiles
2. **Ticket Creation**: Users can create tickets with priority levels
3. **Automatic Assignment**: System assigns tickets based on rules
4. **Email Alerts**: Agents receive notifications automatically







### Common Issues

1. **Email not sending**: Check email credentials and app passwords
2. **Database connection**: Verify database URL and credentials
3. **Frontend not connecting**: Ensure `NEXT_PUBLIC_SERVER_URI` is correct
4. **Port conflicts**: Check if ports 3000 and 8000 are available

