"""Risk assessment endpoint."""
from fastapi import APIRouter, HTTPException
from app.schemas import RiskRequest, RiskResponse
from app.services.risk_service import calculate_risk

router = APIRouter(prefix="/api/v1", tags=["risk"])


@router.post("/risk", response_model=RiskResponse)
def get_risk(data: RiskRequest):
    """Assess environmental risk from rainfall and AQI data."""
    try:
        return calculate_risk(data.rainfall, data.aqi)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Risk calculation failed: {str(e)}")
