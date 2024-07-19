from datetime import datetime
from typing import Optional, List, Annotated
from bson import ObjectId
from pydantic import BaseModel, Field, BeforeValidator, ConfigDict


class Link(BaseModel):
    """
    Represents a hyperlink with a URL and associated text.

    Attributes:
        url (str): The URL of the link.
        text (str): The text description or label of the link.
    """
    url: str
    text: str


class Image(BaseModel):
    """
    Represents an image with its source URL and file ID.

    Attributes:
        src (str): The source URL of the image.
        file_id (Optional[str]): The unique identifier for the Telegram image file.
    """
    src: str
    file_id: Optional[str] = None


class Service(BaseModel):
    """
    Represents a service with a name and an optional price.

    Attributes:
        name (str): The name of the service.
        price (Optional[float]): The price of the service, if applicable.
    """
    name: str
    price: Optional[float]


class DateTime(BaseModel):
    """
    Represents a time range with start and end datetimes.

    Attributes:
        start (datetime): The start datetime of the time range.
        end (datetime): The end datetime of the time range.
    """
    start: datetime
    end: datetime


# Represents an ObjectId field in the database.
# It will be represented as a `str` on the model so that it can be serialized to JSON.
PyObjectId = Annotated[str, BeforeValidator(str)]


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
