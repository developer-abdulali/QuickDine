# QuickDine Frontend 🍽️✨

**QuickDine** is a modern, full-featured restaurant reservation & table management web application. Built with a clean, domain-driven modular architecture, QuickDine delivers a seamless dining discovery and booking experience for diners, powerful control tools for restaurant owners, and a master administration console.

---

## ✨ Core Features

### 🍷 For Diners
- **Curated Restaurant Discovery**: Filter and search venues by location, cuisine, price range ($ to $$$$), and guest capacity.
- **Real-Time Seat Availability**: Live checks for time slots and seating capacity per date.
- **Seamless Booking Flow**: Reserve tables with occasion tagging (Anniversary, Birthday, Business) and special dietary/seating requests.
- **Diner Dashboard**: View upcoming reservations, track past dining history, and manage/cancel bookings.

### 👨‍🍳 For Restaurant Owners
- **Onboarding & Registration Wizard**: Submit new venue listings complete with banner upload, executive chef details, and cuisine tags.
- **Slot & Capacity Control**: Manage available time slots and total seat capacity in real time.
- **Reservation Management**: Track incoming dining requests, filter by venue, and mark bookings as `Completed` or `Cancelled`.

### 🛡️ Master Admin Console
- **Partner Approvals**: Audit, approve, or suspend incoming restaurant registration requests.
- **Platform Analytics**: Comprehensive KPI dashboard tracking total active diners, partner venues, and overall booking volume.
- **User Governance**: Manage user accounts and dynamically assign roles (`user`, `owner`, `admin`).

---

## 🏗️ Project Architecture

The codebase follows a domain-driven, component-per-folder structure using kebab-case subdirectories with `index.ts` barrel re-exports:

```
frontend/src/
├── assets/          # Static assets, images, and icon mappings
├── components/      # Modular UI components
│   ├── admin/       # Admin console components (admin-approvals, admin-stats, admin-users)
│   ├── booking/     # Reservation flow components (booking-form, booking-success, booking-summary)
│   ├── common/      # Reusable shared UI elements (navbar, footer, loader, auth-modal, etc.)
│   ├── home/        # Landing page sections (hero, exclusive-tables, cuisine-browse, etc.)
│   ├── owner/       # Owner dashboard components (restaurant-wizard, owner-bookings, etc.)
│   └── restaurant/  # Restaurant details components (booking-widget, restaurant-hero, etc.)
├── context/         # Global AppContext (Authentication, User state, JWT management)
├── lib/             # Axios API client setup and interceptors
├── pages/           # Application views (home, search, restaurant-detail, dashboard, admin, owner)
├── App.tsx          # Router configuration and global toasts
└── main.tsx         # Application entry point
```

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **State Management**: React Context API
- **HTTP Client**: Axios

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or higher) and **npm** installed.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/quickdine.git
   cd quickdine/frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Development Server

Run the Vite development server:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### Building for Production

Compile TypeScript and build the production bundle:
```bash
npm run build
```

Preview the build locally:
```bash
npm run preview
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE.md` for details.

