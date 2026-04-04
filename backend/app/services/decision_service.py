def make_decision(risk_score, stay, relocate, loss, premium, coverage):
    # 🎯 Core decision logic

    if risk_score > 70:
        decision = "Relocate & Activate Insurance"
        reason = "High disruption risk detected"
    elif risk_score > 40:
        decision = "Work with Caution"
        reason = "Moderate risk environment"
    else:
        decision = "Safe to Work"
        reason = "Low risk conditions"

    # 💡 AI-style recommendation text
    recommendation = (
        f"{reason}. {decision}. "
        f"You can save ₹{round(loss)}"
    )

    return {
        "decision": decision,
        "recommendation": recommendation
    }