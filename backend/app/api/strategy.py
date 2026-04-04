from fastapi import APIRouter
from app.services.strategy_service import generate_strategy

router = APIRouter()

@router.post("/strategy")
def get_strategy(data: dict):
    risk_score = data.get("risk_score", 0)
    return generate_strategy(risk_score)