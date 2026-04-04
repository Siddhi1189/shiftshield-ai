def generate_strategy(risk_score: float):
    if risk_score > 70:
        return {
            "plan": "Delay start by 30 mins and shift to low-risk zone",
            "expected_gain": 120,
            "reason": "High disruption risk detected"
        }

    elif risk_score > 40:
        return {
            "plan": "Work in moderate zones and avoid peak pollution areas",
            "expected_gain": 60,
            "reason": "Moderate risk environment"
        }

    else:
        return {
            "plan": "Safe to work normally",
            "expected_gain": 0,
            "reason": "Low risk conditions"
        }