"""Risk assessment service — calculates disruption risk from environmental data."""
from app.core.config import (
    RAINFALL_WEIGHT, AQI_WEIGHT, MAX_RAINFALL, MAX_AQI,
    RISK_LOW_THRESHOLD, RISK_HIGH_THRESHOLD,
    RAINFALL_TRIGGER, AQI_TRIGGER,
)


def calculate_risk(rainfall: float, aqi: float) -> dict:
    """Calculate risk score from rainfall and AQI.

    Args:
        rainfall: Rainfall in mm (0–500).
        aqi: Air Quality Index (0–500).

    Returns:
        dict with risk_score, risk_level, factors, and confidence.
    """
    # Normalize inputs — clamp to 0–1 range
    rain_factor = min(rainfall / MAX_RAINFALL, 1.0)
    aqi_factor = min(aqi / MAX_AQI, 1.0)

    # Weighted risk score (0–100)
    risk_score = (rain_factor * RAINFALL_WEIGHT + aqi_factor * AQI_WEIGHT) * 100
    risk_score = round(max(0.0, min(risk_score, 100.0)), 2)

    # ── Floor rule: if a trigger threshold is crossed the score must be
    #    at least Medium (RISK_LOW_THRESHOLD), because a single hazardous
    #    reading (e.g. AQI 280) is already dangerous for outdoor workers. ──
    trigger_rain = rainfall > RAINFALL_TRIGGER
    trigger_aqi  = aqi > AQI_TRIGGER

    if (trigger_rain or trigger_aqi) and risk_score < RISK_LOW_THRESHOLD:
        risk_score = float(RISK_LOW_THRESHOLD)

    # If BOTH triggers fire, push the floor up to 55 (solidly Medium)
    if trigger_rain and trigger_aqi and risk_score < 55:
        risk_score = 55.0

    # Risk level classification
    if risk_score < RISK_LOW_THRESHOLD:
        level = "Low"
    elif risk_score < RISK_HIGH_THRESHOLD:
        level = "Medium"
    else:
        level = "High"

    # Contributing factors
    factors = []
    if trigger_rain:
        factors.append(f"Heavy rainfall detected ({rainfall}mm > {RAINFALL_TRIGGER}mm threshold)")
    if trigger_aqi:
        factors.append(f"High pollution levels (AQI {aqi} > {AQI_TRIGGER} threshold)")
    if rainfall > MAX_RAINFALL * 0.75:
        factors.append("Extreme rainfall — flood risk elevated")
    if aqi > MAX_AQI * 0.8:
        factors.append("Hazardous air quality — outdoor work unsafe")

    # Confidence derived from available signals
    confidence = min(95, 55 + len(factors) * 12 + int(risk_score * 0.1))

    return {
        "risk_score": risk_score,
        "risk_level": level,
        "factors": factors,
        "confidence": confidence,
    }