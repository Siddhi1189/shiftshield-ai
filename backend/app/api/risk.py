from fastapi import APIRouter
from app.services.risk_service import calculate_risk

router = APIRouter()

@router.post("/risk")
def get_risk(data: dict):
    rainfall = data.get("rainfall", 0)
    aqi = data.get("aqi", 0)

    return calculate_risk(rainfall, aqi)