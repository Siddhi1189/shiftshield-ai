"""Shift optimization service — recommends work strategy based on risk."""
from app.core.config import RISK_LOW_THRESHOLD, RISK_HIGH_THRESHOLD


def generate_strategy(risk_score: float) -> dict:
    """Generate shift optimization strategy.

    Args:
        risk_score: Risk score (0–100).

    Returns:
        dict with plan, expected_gain, and reason.
    """
    risk_score = max(0.0, min(risk_score, 100.0))  # clamp

    if risk_score >= RISK_HIGH_THRESHOLD:
        # Gain scales with severity above the high threshold
        gain = round(80 + (risk_score - RISK_HIGH_THRESHOLD) * 1.5)
        return {
            "plan": "Delay start by 30 mins and shift to low-risk zone",
            "expected_gain": gain,
            "reason": f"High disruption risk ({risk_score:.0f}%) — relocating maximizes earnings",
        }
    elif risk_score >= RISK_LOW_THRESHOLD:
        gain = round(30 + (risk_score - RISK_LOW_THRESHOLD) * 0.75)
        return {
            "plan": "Work in moderate zones and avoid peak pollution areas",
            "expected_gain": gain,
            "reason": f"Moderate risk ({risk_score:.0f}%) — selective zone work recommended",
        }
    else:
        return {
            "plan": "Safe to work normally — optimal conditions",
            "expected_gain": 0,
            "reason": f"Low risk ({risk_score:.0f}%) — no disruption expected",
        }