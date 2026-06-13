"""Earnings impact service — estimates income loss from disruptions."""
from app.core.config import BASE_SHIFT_INCOME, LOSS_FACTOR, RELOCATION_SAVINGS_FACTOR


def calculate_earnings(risk_score: float) -> dict:
    """Estimate earnings impact based on risk score.

    Args:
        risk_score: Risk score (0–100).

    Returns:
        dict with stay_earnings, relocate_earnings, and loss.
    """
    risk_score = max(0.0, min(risk_score, 100.0))  # clamp

    loss = (risk_score / 100) * BASE_SHIFT_INCOME * LOSS_FACTOR
    stay_earnings = max(0, BASE_SHIFT_INCOME - loss)
    # Relocating recovers RELOCATION_SAVINGS_FACTOR fraction of the loss
    relocate_earnings = max(0, BASE_SHIFT_INCOME - (loss * (1 - RELOCATION_SAVINGS_FACTOR)))

    return {
        "stay_earnings": round(stay_earnings),
        "relocate_earnings": round(relocate_earnings),
        "loss": round(loss),
    }