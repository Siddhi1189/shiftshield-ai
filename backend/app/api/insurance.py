"""Insurance pricing endpoint."""
from fastapi import APIRouter, HTTPException
from app.schemas import InsuranceRequest, InsuranceResponse
from app.services.insurance_service import calculate_insurance

router = APIRouter(prefix="/api/v1", tags=["insurance"])


@router.post("/insurance", response_model=InsuranceResponse)
def get_insurance(data: InsuranceRequest):
    """Calculate dynamic insurance premium and coverage."""
    try:
        return calculate_insurance(data.risk_score)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Insurance calculation failed: {str(e)}")