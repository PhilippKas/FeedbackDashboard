from pydantic import BaseModel, Field

class TPOverviewResponse(BaseModel):
    Tool: str = Field(..., description="Name of the page")
    Rating: float = Field(..., ge=1, le=5, description="Rating of the page")