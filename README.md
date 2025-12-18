# FlipEarn 🚀

**Social Media Account Marketplace**

FlipEarn is a full-stack marketplace where users can **buy and sell social media accounts** securely.
The platform supports real-time chat between buyers and sellers, account management, admin moderation, and financial tracking.

🔗 **Live Demo:** [https://flipearn-iota.vercel.app](https://flipearn-iota.vercel.app)

---

## ✨ Features

### 👤 User Features

* User authentication with **Clerk**
* Browse social media accounts for sale
* Sell social media accounts with detailed metrics
* Real-time chat with sellers/buyers
* Account verification & status tracking
* Secure purchase flow (Stripe integration)
* User balance, earnings, and withdrawals

### 💬 Chat System

* Direct buyer ↔ seller messaging
* Auto-create or reuse chats per listing
* Read/unread message status
* Message timestamps
* Listing-based conversations

### 🛠 Admin Panel

* Admin authentication & protection
* Approve, ban, deactivate, or delete listings
* Verify and update account credentials
* Manage users and transactions
* Financial dashboard (earnings, withdrawals, balances)
* Full marketplace moderation

---

## 🧱 Tech Stack

### Frontend

* **React**
* **Redux Toolkit**
* **Tailwind CSS**
* **Vite**
* **Clerk (Auth)**

### Backend

* **Node.js**
* **Express**
* **PostgreSQL**
* **Prisma ORM**
* **Inngest** (event-driven workflows)
* **Clerk** (authentication & user sync)
* **Stripe** (payments)
* **Brevo (SMTP / Email)**
* **ImageKit** (image storage)

### Database

* **PostgreSQL (Neon)**

---

## 📁 Project Structure

```
flipearn/
├── client/   # Frontend (React + Vite)
└── server/   # Backend (Express + Prisma)
```

---

## ⚙️ Environment Variables

### Client (`client/.env`)

```env
VITE_CURRENCY='$'
VITE_CLERK_PUBLISHABLE_KEY=
VITE_BASEURL="http://localhost:4000"
```

### Server (`server/.env`)

```env
NODE_ENV="development"

# Database (Neon)
DATABASE_URL=
DIRECT_URL=

# Clerk
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Inngest
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=

# ImageKit
IMAGEKIT_PRIVATE_KEY=

# Admin
ADMIN_EMAILS=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Email (Brevo / SMTP)
SENDER_EMAIL=
SMTP_USER=
SMTP_PASS=
```

---

## 🧪 Running Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/diegovilhalva/flipearn.git
cd flipearn
```

### 2️⃣ Install dependencies

```bash
cd client
npm install

cd ../server
npm install
```

### 3️⃣ Setup Prisma

```bash
cd server
npx prisma generate
npx prisma migrate dev
```

### 4️⃣ Run the project

```bash
# Backend
cd server
npm run dev

# Frontend
cd client
npm run dev
```

Frontend will run on `http://localhost:5173`
Backend will run on `http://localhost:4000`

---

## 🔐 Authentication & Roles

* Authentication handled by **Clerk**
* Users are synced to the database via **Inngest events**
* Admin access is controlled via `ADMIN_EMAILS`
* Secure API routes with middleware protection

---

## 💳 Payments

* Integrated with **Stripe**
* Supports secure transactions
* Webhooks ready for production usage
* Admin financial tracking & dashboards

---

## 📈 Future Improvements

* WebSocket or real-time messaging (instead of polling)
* Escrow system for safer transactions
* Rating & review system
* Subscription plans
* Multi-currency support

---

## 👨‍💻 Author

**Diego Vilhalva**
Full Stack Developer

---

## 📄 License

This project is licensed under the MIT License.

