import os
from dotenv import load_dotenv

load_dotenv()

# Server
APP_TITLE = "ShiftShield AI Backend"
APP_VERSION = "1.0.0"

# CORS
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5173,http://localhost:3000"
).split(",")

# Risk thresholds (unified across all services)
RISK_LOW_THRESHOLD = 30
RISK_HIGH_THRESHOLD = 70

# Earnings
BASE_SHIFT_INCOME = 500  # ₹ average per shift
LOSS_FACTOR = 0.6
RELOCATION_SAVINGS_FACTOR = 0.7  # relocate reduces loss by 70%

# Insurance
BASE_PREMIUM = 10  # ₹ base weekly premium
VOLATILITY_FACTOR = 1.2
COVERAGE_MULTIPLIER = 25

# Risk weights
RAINFALL_WEIGHT = 0.6
AQI_WEIGHT = 0.4
MAX_RAINFALL = 200  # mm
MAX_AQI = 500

# Trigger thresholds for auto-claim
RAINFALL_TRIGGER = 80  # mm
AQI_TRIGGER = 250
