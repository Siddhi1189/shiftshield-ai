# ⚡ ShiftShield AI

> **AI-powered parametric insurance & shift optimization for gig delivery workers**

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/Frontend-React%20+%20Vite-61DAFB?style=flat-square&logo=react)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?style=flat-square&logo=python)](https://python.org/)

---

## 📌 Problem Statement

India's **20 million+ gig delivery workers** (Zomato, Swiggy, Blinkit, etc.) lose **20–30% of their weekly income** due to external disruptions they cannot control:

| Disruption | Impact |
|---|---|
| 🌧️ Heavy rain / floods | Orders drop, roads blocked |
| 🌫️ AQI spikes (pollution) | Health risk, forced stoppage |
| 🚦 Traffic restrictions | Delivery time increases, earnings fall |

There is currently **no real-time financial safety net** for these workers. ShiftShield AI fixes that.

---

## 💡 Solution

ShiftShield AI is a **full-stack AI platform** that combines:

- 🔍 **Real-time environmental risk analysis** (rainfall + AQI → risk score)
- 💸 **Earnings impact simulation** (stay vs. relocate earnings)
- 🛡️ **Parametric insurance** (auto-triggered payouts, no claim form needed)
- 🗺️ **Shift optimization** (AI-recommended strategy to maximize income)
- 📊 **Admin analytics** (claims trends, fraud detection, risk distribution)

---

## ⚙️ How It Works

```
Select City → Adjust Conditions → Run AI Analysis
     ↓
Risk Score → Earnings Impact → Insurance Pricing
     ↓
AI Decision → Shift Strategy → Auto-Claim (if triggered)
```

1. Worker selects their **city** (pre-filled with real-world conditions)
2. AI calculates a **weighted risk score** from rainfall & AQI
3. **Earnings impact** is simulated (stay vs. relocate)
4. **Dynamic insurance premium & coverage** is priced to risk
5. **AI decision engine** recommends the best action
6. If thresholds are crossed → **claim auto-activated**, payout credited
7. All events logged in the **Admin Panel** for fraud monitoring

---

## 🏙️ Supported Cities

12 major Indian cities with pre-set peak-season conditions:

| City | Typical Risk | Key Condition |
|------|:---:|---|
| 🌫️ Delhi | Medium–High | Winter smog (AQI 350+) |
| ⛈️ Kolkata | Medium–High | Monsoon rain (130mm+) |
| ⛈️ Kochi | Medium | SW monsoon (150mm+) |
| 🌧️ Mumbai | Medium | Monsoon rain (110mm+) |
| 🌧️ Chennai | Medium | NE monsoon (95mm+) |
| 🌫️ Ahmedabad | Medium | Industrial AQI (260+) |
| 🌫️ Jaipur | Medium | Dust haze (AQI 275+) |
| 🌫️ Lucknow | Medium | Fog season (AQI 290+) |
| 🌦️ Surat | Medium | Rain + AQI combo |
| 🌤️ Hyderabad | Low | Mild conditions |
| 🌦️ Bengaluru | Low | Pleasant weather |
| 🌦️ Pune | Low | Moderate conditions |

---

## 📊 Parametric Trigger Thresholds

Claims are triggered **automatically** when:

| Parameter | Threshold | Action |
|---|---|---|
| 🌧️ Rainfall | > 80 mm | Auto-claim activated |
| 🌫️ AQI | > 250 | Auto-claim activated |
| Both triggered | Both crossed | Payout guaranteed, risk floor = 55% |

---

## 💰 Dynamic Pricing Model

Premiums are calculated in real-time based on risk score — not fixed brackets:

```
Premium  = BASE_PREMIUM × (1 + risk_multiplier × VOLATILITY_FACTOR)
Coverage = Premium × COVERAGE_MULTIPLIER
```

| Risk Level | Score Range | Example Premium | Example Coverage |
|---|:---:|:---:|:---:|
| 🟢 Low | 0–29% | ₹10/week | ₹250 |
| 🟡 Medium | 30–69% | ₹14–18/week | ₹350–₹450 |
| 🔴 High | 70–100% | ₹20–22/week | ₹500–₹550 |

---

## 🖥️ Features

### 👷 Worker Dashboard
- **City picker** — 12 cities with pre-set environmental conditions
- **Risk score** — weighted AI calculation (rainfall 60% + AQI 40%)
- **Earnings simulation** — stay vs. relocate comparison
- **AI decision card** — typed recommendation with relocate/claim badges
- **Shift strategy** — actionable plan with expected gain
- **Auto-claim engine** — triggers & credits payout automatically

### 📄 Policy Management
- Active policy status, validity, and renewal info
- Parametric trigger conditions clearly displayed
- Policy benefits & auto-payout explanation

### 💰 Claims History
- Full claim history with IDs, dates, and status
- Total payout summary
- Auto-trigger threshold reference

### 🛠️ Admin Analytics
- Platform metrics (total claims, fraud alerts, active users, payouts)
- Claims trend line chart
- Risk distribution pie chart
- Fraud analysis bar chart
- Real-time system logs

---

## 🔐 Authentication & Access Control

| Role | Access | Login Hint |
|---|---|---|
| **Worker** | Dashboard, Policy, Claims | Any email (e.g. `worker@test.com`) |
| **Admin** | Admin Panel | Email containing `admin` |

> Session is persisted in `localStorage`. No backend auth required for demo.

---

## 🏗️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + Vite | UI framework |
| Tailwind CSS | Utility-first styling |
| React Router v6 | Client-side routing |
| Recharts | Admin analytics charts |
| Axios | HTTP client with interceptors |

### Backend
| Technology | Purpose |
|---|---|
| FastAPI | REST API framework |
| Pydantic v2 | Request/response validation |
| Uvicorn | ASGI server |
| python-dotenv | Environment config |

### Architecture
- **Stateless** REST API — no database required for demo
- **Versioned routes** at `/api/v1/*` + legacy routes at `/*` for compat
- **CORS** controlled via `ALLOWED_ORIGINS` env variable
- **Lazy-loaded** React pages with `Suspense` fallback

---

## 📂 Project Structure

```
shiftshield-ai/
│
├── backend/
│   ├── app/
│   │   ├── api/               # Route handlers (risk, earnings, insurance, decision, strategy)
│   │   ├── services/          # Business logic (one service per domain)
│   │   ├── core/
│   │   │   └── config.py      # All constants & thresholds in one place
│   │   ├── schemas.py         # Pydantic request/response models
│   │   └── main.py            # FastAPI app entry point
│   ├── requirements.txt
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── pages/             # Home, Login, Dashboard, Policy, Claims, Admin, NotFound
    │   ├── components/        # Navbar, Layout, Footer, ProtectedRoute, ErrorBoundary
    │   ├── context/           # AuthContext (role-based auth)
    │   └── services/
    │       └── api.js         # Axios instance with env-based URL + error interceptor
    ├── .env                   # VITE_API_URL
    └── .env.example
```

---

## 🚀 Local Setup

### 1. Clone the repo
```bash
git clone https://github.com/Siddhi1189/shiftshield-ai.git
cd shiftshield-ai
```

### 2. Backend
```bash
cd backend

# Copy env config
cp .env.example .env

# Install dependencies
pip install -r requirements.txt

# Start server
python -m uvicorn app.main:app --reload --port 8000
# → http://localhost:8000
# → Swagger docs: http://localhost:8000/docs
```

### 3. Frontend
```bash
cd frontend

# Copy env config (already set to localhost:8000)
cp .env.example .env

# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:5173
```

---

## 🌐 Deployment

### Frontend → Vercel
```bash
cd frontend
npm run build
# Deploy the dist/ folder to Vercel
```

Set environment variable in Vercel dashboard:
```
VITE_API_URL=https://shiftshield-backend.onrender.com
```

### Backend → Render
- Set **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port 10000`
- Add environment variable:
```
ALLOWED_ORIGINS=https://shiftshield-ai.vercel.app,http://localhost:5173
```

---

## 🎬 Demo Flow

```
1. Open http://localhost:5173
2. Click "Get Started Free"
3. Login as worker (any email) or admin (email with "admin")
4. Dashboard → select a city (try Delhi or Kolkata)
5. Click "⚡ Run Analysis"
6. See risk score, AI decision, earnings impact, shift strategy
7. Navigate to Policy → view coverage details
8. Navigate to Claims → view payout history
9. Logout → Login as admin → view Admin analytics panel
```

---

## 🔮 Future Scope

- 🌐 Real-time weather & AQI API integration (OpenWeatherMap, WAQI)
- 🗺️ Hyperlocal risk heatmaps (zone-level safety scores)
- 📱 Mobile app (React Native)
- 🔗 Platform SDK integration (Zomato / Swiggy partner API)
- 🤖 Advanced ML models (time-series rainfall prediction)
- 🏦 Real payment gateway (Razorpay / UPI auto-payout)
- 🔐 Actual JWT authentication with a database (PostgreSQL)

---

## 🔥 Why ShiftShield Stands Out

| Feature | Traditional Insurance | ShiftShield AI |
|---|:---:|:---:|
| Claim process | Manual form | ✅ Fully automated |
| Payout speed | Weeks | ✅ Instant simulation |
| Premium pricing | Fixed bracket | ✅ Dynamic, real-time |
| Risk intelligence | None | ✅ AI-powered |
| Shift optimization | None | ✅ Relocate strategy |
| City-aware | No | ✅ 12 Indian cities |

---

## 👥 Team

Built by **Team ShiftShield** for hackathon / educational purposes.

- Siddhi Patel
- Archi Kumari
- Samiksha Lohia

---

## 📜 License

Hackathon / Educational Use Only.

---

> ⭐ If this project impressed you, give it a star!
