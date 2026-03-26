# Smart EV Charging System 

A full-stack smart charging platform that manages EV charging sessions, schedules
vehicles intelligently, and visualizes real-time charging behavior.

## Currently published features:
### Smart Charging Scheduler

Automatically assigns vehicles to chargers based on:
- Vehicle priority
- Charger availability

### Real-Time Dashboard
Displays:
- Active charging sessions
- Vehicle State-of-Charge
- Busy/idle chargers
- Live SoC chart updating every 10s

### Vehicle & Charger Management
- Track current charge & battery capacity
- Display charger status

## Architecture Overview
- Frontend: visualization + UI
- Backend: scheduling logic + REST API
- Database: persistent storage for vehicles, chargers, sessions
## Technologies Used
### Backend

| Technology             | Purpose                |
| ---------------------- | ---------------------- |
| **Java 21**            | Language               |
| **Spring Boot**        | REST API framework     |
| **MySQL**              | Database               |
| **Lombok**             | Boilerplate reduction  |

### Frontend
| Tech                  | Purpose          |
| --------------------- | ---------------- |
| **React + Vite**      | Web application  |
| **Tailwind CSS**      | Styling          |
| **Fetch API**         | Communication    |


## State-of-Charge (SoC) Chart

This system includes a real-time SOC graph that:

- Displays only currently charging vehicles
- Updates automatically every 10 seconds
- Shows each vehicle in a unique color
- Stores the last 6 datapoints per vehicle
- Simulates charge progression when backend lacks real-time updates

## Getting Started
From root folder:
> npm run dev
Frontend runs at: http://localhost:5173/



