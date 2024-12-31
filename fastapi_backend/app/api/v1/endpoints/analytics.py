from fastapi import APIRouter, HTTPException, Query
from datetime import datetime
import json
import polars as pl
from typing import List
from app.schemas.analytics import TPOverviewResponse

router = APIRouter()

data = pl.read_csv("app/data/data.csv")

@router.get("/tp_overview", response_model=List[TPOverviewResponse])
async def get_tp_overview(
    start_date: str = Query(..., description="Start date for analysis"),
    end_date: str = Query(..., description="End date for analysis")
) -> List[TPOverviewResponse]:
    start = datetime.strptime(start_date, "%Y-%m-%d").date()
    end = datetime.strptime(end_date, "%Y-%m-%d").date()

    try:
        response = data.with_columns(
            pl.col("Date").str.strptime(pl.Date, "%Y-%m-%d")
        ).filter(
            pl.col("Date").is_between(start, end)
        ).group_by("Tool").agg(
            pl.col("Rating").mean().round(2)
        ).write_json()
        
        return json.loads(response)
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch TP overview data: {str(e)}"
        )