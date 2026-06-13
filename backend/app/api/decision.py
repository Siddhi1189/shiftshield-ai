"""Decision engine endpoint."""
from fastapi import APIRouter, HTTPException
from app.schemas import DecisionRequest, DecisionResponse
from app.services.decision_service import make_decision

router = APIRouter(prefix="/api/v1", tags=["decision"])


@router.post("/decision", response_model=DecisionResponse)
def get_decision(data: DecisionRequest):
    """Generate an AI-driven work decision based on risk and earnings analysis."""
    try:
        return make_decision(
            risk_score=data.risk_score,
            stay_earnings=data.stay_earnings,
            relocate_earnings=data.relocate_earnings,
            loss=data.loss,
            premium=data.premium,
            coverage=data.coverage,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Decision engine failed: {str(e)}")