import json
from typing import List, Optional, Union

from fastapi import Form
from pydantic import BaseModel


class LinkForm(BaseModel):
    url: str
    text: str


class DateTimeForm(BaseModel):
    start: str
    end: str


class ImageForm(BaseModel):
    src: str
    file_id: Union[str, None]


class ServiceForm(BaseModel):
    name: str
    price: Union[str, int, float]


class EventForm(BaseModel):
    id: str
    name: str
    description: str
    link: LinkForm
    price: str
    services: List[ServiceForm]
    date_time: DateTimeForm
    main_image: ImageForm
    images: List[ImageForm]


def to_event_form(
    event_id: str,
    name: str = Form(...),
    description: str = Form(...),
    link: str = Form(...),
    price: str = Form(...),
    date_time: str = Form(...),
    services: str = Form(...),
    main_image: str = Form(...),
    images: str = Form(...),
) -> EventForm:
    return EventForm(
        id=event_id,
        name=name,
        description=description,
        link=LinkForm(**json.loads(link)),
        price=price,
        date_time=DateTimeForm(**json.loads(date_time)),
        services=[ServiceForm(**service) for service in json.loads(services)],
        main_image=ImageForm(**json.loads(main_image)),
        images=[ImageForm(**image) for image in json.loads(images)]
    )