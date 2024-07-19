from datetime import datetime
from typing import Optional, List, Annotated
from bson import ObjectId
from pydantic import BaseModel, Field, BeforeValidator, ConfigDict

from internal.dto.types import PyObjectId, Link, Image, DateTime, Service


class EventDTO(BaseModel):
    """
    Data Transfer Object (DTO) for an event, encapsulating all relevant event details.

    Attributes:
        id (Optional[PyObjectId]): The unique identifier for the event (alias '_id').
        name (str): The name of the event.
        description (Optional[str]): A brief description of the event.
        link (Optional[Link]): A hyperlink associated with the event.
        price (Optional[float]): The price of the event, if applicable.
        main_image (Optional[Image]): The main image associated with the event.
        images (Optional[List[Image]]): A list of additional images related to the event.
        date_time (Optional[DateTime]): The time range during which the event takes place.
        subscriptions (Optional[List[str]]): A list of subscription IDs related to the event.
        services (Optional[List[Service]]): A list of services offered in conjunction with the event.
        editor (Optional[str]): The ID of the editor who last modified the event details.

    Class Settings:
        name (str): The name of the collection to store these objects.

    Class Config:
        arbitrary_types_allowed (bool): Allows arbitrary types to be used.
        json_encoders (dict): Custom JSON encoders for specific types.
    """
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str
    description: Optional[str] = None
    link: Optional[Link] = None
    price: Optional[float] = 0.0
    main_image: Optional[Image] = None
    images: Optional[List[Image]] = []
    date_time: Optional[DateTime] = None
    subscriptions: Optional[List[str]] = []
    services: Optional[List[Service]] = []
    editor: Optional[str] = None
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_encoders={
            ObjectId: str
        }
    )
