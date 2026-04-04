from fastapi import APIRouter
from app.services.decision_service import make_decision

router = APIRouter()

@router.post("/decision")
def get_decision(data: dict):
    return make_decision(
        risk_score=data.get("risk_score", 0),
        stay=data.get("stay_earnings", 0),
        relocate=data.get("relocate_earnings", 0),
        loss=data.get("loss", 0),
        premium=data.get("premium", 0),
        coverage=data.get("coverage", 0),
    )