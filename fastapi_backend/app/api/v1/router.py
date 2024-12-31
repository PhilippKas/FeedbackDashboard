from fastapi import APIRouter
from app.api.v1.endpoints.analytics import router as tp_overview_router

api_router = APIRouter()
api_router.include_router(tp_overview_router, prefix="/analytics", tags=["analytics"])
