from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import insurance, decision
from app.api import strategy

from app.api import risk, earnings

app = FastAPI(title="ShiftShield AI Backend")

# ✅ Register routes
app.include_router(risk.router)
app.include_router(earnings.router)
app.include_router(insurance.router)
app.include_router(decision.router)
app.include_router(strategy.router)

# ✅ Allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Backend running"}