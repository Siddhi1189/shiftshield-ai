from fastapi import APIRouter
from app.services.insurance_service import calculate_insurance

router = APIRouter()

@router.post("/insurance")
def get_insurance(data: dict):
    risk_score = data.get("risk_score", 0)

    return calculate_insurance(risk_score)