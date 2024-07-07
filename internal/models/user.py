from datetime import datetime
from typing import Union, List
from bson import ObjectId
from marshmallow import Schema, fields, post_load

from models.types import FullName, Link, Photo, EventProduct, FullNameSchema, PhotoSchema, LinkSchema, EventProductSchema


class User:
    def __init__(self,
                 _id: Union[ObjectId, None] = None,
                 id: Union[str, None] = None,
                 full_name: Union[FullName, None] = None,
                 username: Union[str, None] = None,
                 phone: Union[str, None] = None,
                 description: Union[str, None] = None,
                 link: Union[Link, None] = None,
                 photo: Union[Photo, None] = None,
                 events: Union[List[EventProduct], None] = None,
                 archive: Union[ObjectId, None] = None,
                 online: datetime = datetime.now(),
                 registration: datetime = datetime.now(),
                 scrore: int = 0):
        self._id = _id
        self.id = id
        self.full_name = full_name
        self.username = username
        self.phone = phone
        self.description = description
        self.link = link
        self.photo = photo
        self.events = events
        self.archive = archive
        self.online = online
        self.registration = registration
        self.score = scrore


class UserSchema(Schema):
    _id = fields.Str(allow_none=True)
    id = fields.Str(allow_none=True)
    full_name = fields.Nested(FullNameSchema, allow_none=True)
    username = fields.Str(allow_none=True)
    phone = fields.Str(allow_none=True)
    description = fields.Str(allow_none=True)
    link = fields.Nested(LinkSchema, allow_none=True)
    photo = fields.Nested(PhotoSchema, allow_none=True)
    events = fields.List(fields.Nested(EventProductSchema), allow_none=True)
    archive = fields.Str(allow_none=True)
    online = fields.DateTime(default=datetime.now)
    registration = fields.DateTime(default=datetime.now)
    score = fields.Int(default=0)

    @post_load
    def make_user(self, data, **kwargs):
        return User(**data)