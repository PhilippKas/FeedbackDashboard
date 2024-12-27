import polars as pl
from datetime import datetime
from fastapi import FastAPI, Path, Query, HTTPException, status
from pydantic import BaseModel
from typing import Optional, List

data = pl.read_csv("data.csv")

app = FastAPI(
    title="My First FastAPI App",
    description="A sample API built with FastAPI",
    version="1.0.0"
)

@app.get("/")
async def root():
    """Root endpoint returning a welcome message."""
    return {"message": "Welcome to FastAPI!"}

@app.get("/tp_overview")
async def read_item(
    start_date: str,
    end_date: str
):  
    start = datetime.strptime(start_date, "%Y-%m-%d").date()
    end = datetime.strptime(end_date, "%Y-%m-%d").date()

    return data.with_columns(
        pl.col("Date").str.strptime(pl.Date, "%Y-%m-%d")
    ).filter(
        pl.col("Date").is_between(start, end)
    ).group_by("Tool").agg(
        pl.col("Rating").mean().round(2)
    ).write_json()
     