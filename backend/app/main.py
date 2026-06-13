"""ShiftShield AI — FastAPI application entry point."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import APP_TITLE, APP_VERSION, ALLOWED_ORIGINS
from app.api import risk, earnings, insurance, decision, strategy

app = FastAPI(
    title=APP_TITLE,
    version=APP_VERSION,
    description="AI-powered parametric insurance platform for gig workers",
)

# CORS — restricted to configured origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register versioned API routers
app.include_router(risk.router)
app.include_router(earnings.router)
app.include_router(insurance.router)
app.include_router(decision.router)
app.include_router(strategy.router)

# ── Legacy routes (backward-compat with existing frontend) ───────────────────
from app.services.risk_service import calculate_risk as _calc_risk
from app.services.earnings_service import calculate_earnings as _calc_earn
from app.services.insurance_service import calculate_insurance as _calc_ins
from app.services.decision_service import make_decision as _make_dec
from app.services.strategy_service import generate_strategy as _gen_strat


@app.post("/risk")
def legacy_risk(data: dict):
    return _calc_risk(data.get("rainfall", 0), data.get("aqi", 0))


@app.post("/earnings")
def legacy_earnings(data: dict):
    return _calc_earn(data.get("risk_score", 0))


@app.post("/insurance")
def legacy_insurance(data: dict):
    return _calc_ins(data.get("risk_score", 0))


@app.post("/decision")
def legacy_decision(data: dict):
    return _make_dec(
        risk_score=data.get("risk_score", 0),
        stay_earnings=data.get("stay_earnings", 0),
        relocate_earnings=data.get("relocate_earnings", 0),
        loss=data.get("loss", 0),
        premium=data.get("premium", 0),
        coverage=data.get("coverage", 0),
    )


@app.post("/strategy")
def legacy_strategy(data: dict):
    return _gen_strat(data.get("risk_score", 0))


@app.get("/")
def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "version": APP_VERSION}