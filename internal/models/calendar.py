from datetime import datetime, timedelta
from typing import Union, List
from models.user import User

class Product:
    def __init__(self, description: str = "", price: float = 0.0):
        self.description = description
        self.price = price


class Event:
    def __init__(self,
                 id: Union[str, None] = None,
                 name: str = "",
                 photo: Union[str, None] = None,
                 link: Union[str, None] = None,
                 description: str = "",
                 date: Union[datetime, None] = None,
                 duration: Union[timedelta.days, None] = None,
                 subscriptions: List[User] = [],
                 goods: List[Product] = [],
                 editor: Union[User, None] = None):
        self.id = id
        self.name = name
        self.photo = photo
        self.link = link
        self.description = description
        self.date = date
        self.duration = duration
        self.subscriptions = subscriptions
        self.goods = goods
        self.editor = editor



class Archive:
    def __init__(self, event: Events,):
        self.id = event.id
        self.name = event.name
        self.description = event.description
        self.photo = event.photo
        self.link = event.link
        self.date = event.date
        self.duration = event.duration
        self.subscriptions = event.subscriptions
        self.editor = event.editor