def calculate_earnings(risk_score: float):
    base_income = 500  # average shift earning

    # 📉 Loss increases with risk
    loss = (risk_score / 100) * base_income * 0.6

    # 💰 Stay vs relocate logic
    stay_earnings = base_income - loss
    relocate_earnings = base_income - (loss * 0.3)

    return {
        "stay_earnings": round(stay_earnings),
        "relocate_earnings": round(relocate_earnings),
        "loss": round(loss)
    }