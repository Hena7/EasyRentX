# EasyRentX Frontend - Smart Renting Made Simple

This repository contains the frontend code for EasyRentX, a peer-to-peer rental platform connecting item owners and renters via a broker. This frontend is built using React (with Vite) and Tailwind CSS.

## ✨ Features

*   **Browse & View Items:** Users can view lists of available rental items and see detailed information for each.
*   **User Authentication:** Placeholder pages for Login and Registration (backend integration required).
*   **Theme Switching:** Supports Light and Dark modes, saved to user preference.
*   **Multi-Language Support:** Supports English (default) and Amharic using React Context API.
*   **Responsive Design:** Built with Tailwind CSS for responsiveness across devices.
*   **Expandable Structure:** Organized for maintainability and future backend integration.

## 🚀 Technologies Used

*   [React](https://reactjs.org/) (v18+)
*   [Vite](https://vitejs.dev/) (Frontend Tooling)
*   [Tailwind CSS](https://tailwindcss.com/) (Utility-First CSS Framework)
*   [React Router DOM](https://reactrouter.com/) (Routing)
*   [React Context API](https://reactjs.org/docs/context.html) (State Management for Theme & Language)
*   JavaScript (ES6+)
*   CSS3
*   HTML5

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

*   [Node.js](https://nodejs.org/) (v18.x or later recommended)
*   [npm](https://www.npmjs.com/) (usually comes with Node.js) or [Yarn](https://yarnpkg.com/)
*   [Git](https://git-scm.com/) (for cloning the repository)

## 🛠️ Installation & Setup

Follow these steps to get the development environment running:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    # Example: git clone https://github.com/your-username/easyrentx-frontend.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd easyrentx-frontend
    ```

3.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using Yarn:
    ```bash
    yarn install
    ```

## ⚙️ Running the Development Server

To start the application in development mode with hot-reloading:

```bash
npm run dev
Use code with caution.
Markdown
Or using Yarn:

yarn dev
Use code with caution.
Bash
This will start the Vite development server. Open your browser and navigate to the URL provided (usually http://localhost:5173). The app will automatically reload if you make changes to the code.

🏗️ Building for Production
To create an optimized production build:

npm run build
Use code with caution.
Bash
Or using Yarn:

yarn build
Use code with caution.
Bash
This command will generate static assets (HTML, CSS, JavaScript) in the dist/ directory. These files are ready to be deployed to a static site hosting service.

📁 Project Structure
easyrentx-frontend/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── common/     # General-purpose components (Buttons, etc.)
│   │   ├── features/   # Feature-specific components (ItemCard, etc.)
│   │   └── layout/     # Layout components (Header, Footer)
│   ├── contexts/       # React Context API providers (Theme, Language)
│   ├── hooks/          # Custom React Hooks (useTheme, useLanguage)
│   ├── locales/        # Translation data (translations.js)
│   ├── pages/          # Page-level components (routed components)
│   ├── services/       # (Placeholder) Functions for API calls
│   ├── App.jsx         # Main application component with routing setup
│   ├── index.css       # Global styles & Tailwind directives
│   └── main.jsx        # Application entry point
├── .gitignore          # Git ignore file
├── index.html          # Main HTML file
├── package.json        # Project dependencies and scripts
├── postcss.config.js   # PostCSS configuration (for Tailwind)
├── tailwind.config.js  # Tailwind CSS configuration
├── vite.config.js      # Vite configuration
└── README.md           # This file
Use code with caution.
🤝 Contributing
Contributions are welcome! If you'd like to contribute, please follow these steps:

Fork the repository.

Create a new branch (git checkout -b feature/your-feature-name).

Make your changes.

Commit your changes (git commit -m 'Add some feature').

Push to the branch (git push origin feature/your-feature-name).

Open a Pull Request.

Please ensure your code follows the project's coding style and includes tests where applicable (tests to be added later).


