"""Shift optimization endpoint."""
from fastapi import APIRouter, HTTPException
from app.schemas import StrategyRequest, StrategyResponse
from app.services.strategy_service import generate_strategy

router = APIRouter(prefix="/api/v1", tags=["strategy"])


@router.post("/strategy", response_model=StrategyResponse)
def get_strategy(data: StrategyRequest):
    """Generate shift optimization strategy based on risk score."""
    try:
        return generate_strategy(data.risk_score)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Strategy generation failed: {str(e)}")