# Work Management
Work Management is designed to help teams plan, track, and deliver work efficiently. It allows users to organize tasks, projects, and workflows in a visual and customizable way.

Key features include:

- **Boards** – Centralized workspaces for managing tasks. Each board contains multiple groups and items.
- **Groups** – Sections within a board used to categorize tasks (e.g., by status, phase, or team).
- **Items** – Individual tasks or work units, each with customizable columns such as Person, Status, Date, etc.
- **Custom Columns** – Track progress, assign team members, set deadlines, and manage task-specific data.
- **Drag-and-Drop Interface** – Easily rearrange items or move them between groups.
- **Views** – Support for multiple visualizations like Table, Kanban, Calendar, or Timeline views.

This project focuses on building a core **Work Management** experience, including boards, groups, and items — with an emphasis on simplicity, intuitive interaction, and user-specific data visibility.

## How to Run the Project

1. Clone this repository:  
   ```bash
   "git clone https://github.com/sanyaphoso/work-management.git"
2. Navigate to the project directory:
    ```bash
   "cd work-management"
3. Install dependencies:
    ```bash
   "npm install"
4. Start the development server:
    ```bash
   "npm run dev"

## System Overview

### ✅ Tech Stack Summary
🖥️ Frontend
1. React.js – Used to build UI and components.
2. React Router v6 – For handling routing and URL navigation.
3. Ant Design (AntD) – Provides UI components like Button, Tabs, Modal, Form, Spin, etc.
4. Tailwind CSS – Used alongside AntD for custom layouts and responsive design.
5. Framer Motion (planned) – To add animations in future updates.

### 🔐 Authentication
1. Supabase Auth – Handles user login, registration, and session management.
2. Uses supabase.auth.getUser() to retrieve current user info.
3. Implements Route Protection (PrivateRoute) for pages like Home and Workspace.

### 🗃️ Backend (BaaS)
1. Supabase – Serves as the main backend:
2. Database (PostgreSQL) – Tables such as users, workspaces, boards, groups, items.
3. Row-Level Security (RLS) – Policies controlling data access permissions (currently being configured).
4. API (REST) – Interact via supabase.from("...").select(), .insert(), .eq(), etc.
5. Auth UID Mapping – Uses auth.uid() as owner_id to link data with users.

### 📁 Database Tables Created

| Table             | Description                                                        |
| ----------------- | ------------------------------------------------------------------ |
| users | From Supabase Auth system. |
| workspaces | Workspace areas. |
| boards | Boards inside workspaces. |
| groups | Groups within boards. |
| items | Tasks/items inside groups. |

### 🧠 Concepts and Logic Used
1. RLS Policy – Ensures users only see their own data.
2. Modal Form – Create workspace/board using Ant Design modal dialogs.
3. Dynamic Routing – For example, /workspace/:id and /board/:id to access specific data.
4. State Management – Using React hooks like useState and useEffect for data and lifecycle management.

### React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

🙏 Thank you for checking out the project!
Feel free to contribute or raise issues if you find bugs or want to suggest improvements!
