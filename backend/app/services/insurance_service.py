def calculate_insurance(risk_score: float):
    base_premium = 10

    # 📊 Actuarial-style pricing
    risk_multiplier = risk_score / 100
    volatility_factor = 1.2

    premium = base_premium * (1 + risk_multiplier * volatility_factor)

    # 💰 Coverage logic
    coverage = premium * 25

    return {
        "premium": round(premium),
        "coverage": round(coverage),
        "model": "Dynamic risk-based pricing"
    }