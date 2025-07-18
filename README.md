# Work Management

## How to Run the Project

1. Clone this repository:  
   ```bash
   "git clone https://github.com/sanyaphoso/work-management.git"
2. Navigate to the project directory:
   "cd work-management"
3. Install dependencies:
   "npm install"
4. Start the development server:
   "npm run dev"

## System Overview

✅ Tech Stack Summary
🖥️ Frontend
React.js – Used to build UI and components.

React Router v6 – For handling routing and URL navigation.

Ant Design (AntD) – Provides UI components like Button, Tabs, Modal, Form, Spin, etc.

Tailwind CSS – Used alongside AntD for custom layouts and responsive design.

Framer Motion (planned) – To add animations in future updates.

🔐 Authentication
Supabase Auth – Handles user login, registration, and session management.

Uses supabase.auth.getUser() to retrieve current user info.

Implements Route Protection (PrivateRoute) for pages like Home and Workspace.

🗃️ Backend (BaaS)
Supabase – Serves as the main backend:

Database (PostgreSQL) – Tables such as users, workspaces, boards, groups, items.

Row-Level Security (RLS) – Policies controlling data access permissions (currently being configured).

API (REST) – Interact via supabase.from("...").select(), .insert(), .eq(), etc.

Auth UID Mapping – Uses auth.uid() as owner_id to link data with users.

📁 Database Tables Created
users – From Supabase Auth system.

workspaces – Workspace areas.

boards – Boards inside workspaces.

groups – Groups within boards.

items – Tasks/items inside groups.

🧠 Concepts and Logic Used
RLS Policy – Ensures users only see their own data.

Modal Form – Create workspace/board using Ant Design modal dialogs.

Dynamic Routing – For example, /workspace/:id and /board/:id to access specific data.

State Management – Using React hooks like useState and useEffect for data and lifecycle management.

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Feel free to contribute or raise issues if you find bugs or want to suggest improvements!

