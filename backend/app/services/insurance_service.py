"""Insurance pricing service — calculates premium and coverage dynamically."""
from app.core.config import BASE_PREMIUM, VOLATILITY_FACTOR, COVERAGE_MULTIPLIER


def calculate_insurance(risk_score: float) -> dict:
    """Calculate insurance premium and coverage based on risk score.

    Args:
        risk_score: Risk score (0–100).

    Returns:
        dict with premium, coverage, and pricing model name.
    """
    risk_score = max(0.0, min(risk_score, 100.0))  # clamp

    risk_multiplier = risk_score / 100
    premium = BASE_PREMIUM * (1 + risk_multiplier * VOLATILITY_FACTOR)
    coverage = premium * COVERAGE_MULTIPLIER

    return {
        "premium": round(premium),
        "coverage": round(coverage),
        "model": "Dynamic risk-based pricing",
    }