"""Earnings impact endpoint."""
from fastapi import APIRouter, HTTPException
from app.schemas import EarningsRequest, EarningsResponse
from app.services.earnings_service import calculate_earnings

router = APIRouter(prefix="/api/v1", tags=["earnings"])


@router.post("/earnings", response_model=EarningsResponse)
def get_earnings(data: EarningsRequest):
    """Calculate earnings impact from risk score."""
    try:
        return calculate_earnings(data.risk_score)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Earnings calculation failed: {str(e)}")