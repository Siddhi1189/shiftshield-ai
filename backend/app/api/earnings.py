from fastapi import APIRouter
from app.services.earnings_service import calculate_earnings

router = APIRouter()

@router.post("/earnings")
def get_earnings(data: dict):
    risk_score = data.get("risk_score", 0)

    return calculate_earnings(risk_score)