from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class UserCreate(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class NoteCreate(BaseModel):
    title: str
    content: str

class NoteResponse(BaseModel):
    id: int
    title: str
    content: str
    summary: str
    created_at: datetime
    
    class Config:
        from_attributes = True 