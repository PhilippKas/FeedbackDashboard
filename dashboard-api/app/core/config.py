from pydantic_settings import BaseSettings
from typing import List
from functools import lru_cache

class Settings(BaseSettings):
    PROJECT_NAME: str = "TP Analytics API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",  # React dev server
        "http://localhost:3000",  # Production frontend
    ]
    
    class Config:
        case_sensitive = True
        env_file = ".env"

@lru_cache
def get_settings():
    return Settings()