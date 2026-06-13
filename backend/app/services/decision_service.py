"""Decision engine — recommends actions based on risk and earnings analysis."""
from app.core.config import RISK_LOW_THRESHOLD, RISK_HIGH_THRESHOLD


def make_decision(
    risk_score: float,
    stay_earnings: float,
    relocate_earnings: float,
    loss: float,
    premium: float,
    coverage: float,
) -> dict:
    """Generate a work decision using all provided parameters.

    Args:
        risk_score: Risk score (0–100).
        stay_earnings: Projected earnings if worker stays.
        relocate_earnings: Projected earnings if worker relocates.
        loss: Estimated income loss.
        premium: Insurance premium this week.
        coverage: Insurance payout if claim is triggered.

    Returns:
        dict with decision, recommendation, should_relocate, should_claim.
    """
    should_relocate = (relocate_earnings > stay_earnings) and (risk_score > RISK_LOW_THRESHOLD)
    should_claim = (risk_score >= RISK_HIGH_THRESHOLD) and (coverage > 0)
    net_benefit = max(0, relocate_earnings - stay_earnings)

    if risk_score >= RISK_HIGH_THRESHOLD:
        decision = "Relocate & Activate Insurance"
        reason = (
            f"High disruption risk ({risk_score:.0f}%). "
            f"Relocating saves ₹{net_benefit:.0f}. "
            f"Insurance covers ₹{coverage:.0f} (premium ₹{premium:.0f})."
        )
    elif risk_score >= RISK_LOW_THRESHOLD:
        reloc_hint = f"Consider relocating for +₹{int(net_benefit)}." if should_relocate else "Current zone is acceptable."
        decision = "Work with Caution"
        reason = (
            f"Moderate risk ({risk_score:.0f}%). "
            f"Potential loss ₹{loss:.0f}. "
            f"{reloc_hint}"
        )
    else:
        decision = "Safe to Work"
        reason = (
            f"Low risk ({risk_score:.0f}%). "
            f"Expected earnings ₹{stay_earnings:.0f}. No disruption expected."
        )

    return {
        "decision": decision,
        "recommendation": reason,
        "should_relocate": should_relocate,
        "should_claim": should_claim,
    }