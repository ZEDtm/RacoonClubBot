from datetime import datetime
from typing import Optional, List, Annotated
from bson import ObjectId
from pydantic import BaseModel, Field, BeforeValidator, ConfigDict

USER = 'user'
ADMIN = 'admin'
MODER = 'moder'


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


class FullName(BaseModel):
    first_name: Optional[str] = None
    last_mame: Optional[str] = None
    children_name: Optional[str] = None


class LastScreenRecently:
    bot: Optional[datetime] = None
    web_app: Optional[datetime] = None


# Represents an ObjectId field in the database.
# It will be represented as a `str` on the model so that it can be serialized to JSON.
PyObjectId = Annotated[str, BeforeValidator(str)]
