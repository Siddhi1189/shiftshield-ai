"""Pydantic request/response models for all API endpoints."""
from pydantic import BaseModel, Field
from typing import List, Optional


# ── Risk ─────────────────────────────────────────────
class RiskRequest(BaseModel):
    rainfall: float = Field(..., ge=0, le=500, description="Rainfall in mm")
    aqi: float = Field(..., ge=0, le=500, description="Air Quality Index")


class RiskResponse(BaseModel):
    risk_score: float
    risk_level: str
    factors: List[str]
    confidence: float


# ── Earnings ─────────────────────────────────────────
class EarningsRequest(BaseModel):
    risk_score: float = Field(..., ge=0, le=100, description="Risk score (0-100)")


class EarningsResponse(BaseModel):
    stay_earnings: int
    relocate_earnings: int
    loss: int


# ── Insurance ────────────────────────────────────────
class InsuranceRequest(BaseModel):
    risk_score: float = Field(..., ge=0, le=100, description="Risk score (0-100)")


class InsuranceResponse(BaseModel):
    premium: int
    coverage: int
    model: str


# ── Decision ─────────────────────────────────────────
class DecisionRequest(BaseModel):
    risk_score: float = Field(..., ge=0, le=100)
    stay_earnings: float = Field(0, ge=0)
    relocate_earnings: float = Field(0, ge=0)
    loss: float = Field(0, ge=0)
    premium: float = Field(0, ge=0)
    coverage: float = Field(0, ge=0)


class DecisionResponse(BaseModel):
    decision: str
    recommendation: str
    should_relocate: bool
    should_claim: bool


# ── Strategy ─────────────────────────────────────────
class StrategyRequest(BaseModel):
    risk_score: float = Field(..., ge=0, le=100, description="Risk score (0-100)")


class StrategyResponse(BaseModel):
    plan: str
    expected_gain: int
    reason: str


# ── Health ───────────────────────────────────────────
class HealthResponse(BaseModel):
    status: str
    version: str
