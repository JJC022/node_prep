# pydantic_models.py
from pydantic import BaseModel
from typing import Optional

class GovernmentRecord(BaseModel):
    id: int
    name: str
    status: Optional[str]
    updated_at: str  # ISO timestamp

class medicareplan(BaseModel):
    id: int
    name: str
    status: Optional[str]
    updated_at: str  # ISO timestamp
    formulary: str 