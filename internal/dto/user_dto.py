from datetime import datetime
from typing import Optional, List, Annotated
from bson import ObjectId
from pydantic import BaseModel, Field, BeforeValidator, ConfigDict

from internal.dto.types import PyObjectId, Link, Image, FullName, LastScreenRecently, USER


class UserDTO(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    telegram_id: Optional[int] = None
    full_name: FullName = None
    username: Optional[str] = None
    phone_numbers: Optional[str] = None
    image: Optional[Image] = None
    link: Optional[Link] = None
    last_screen_recently: Optional[LastScreenRecently] = None
    score: int = 0
    subscribes: Optional[List[str]] = []
    reminders: Optional[List[str]] = None
    role: str = USER
    notice: bool = True
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_encoders={
            ObjectId: str
        }
    )
