from datetime import datetime
from typing import Union, List

class User:
    def __init__(self,
                 id: Union[str, None] = None,
                 full_name: str = "",
                 username: Union[str, None] = None,
                 phone: str = "",
                 description: str = "",
                 link: Union[str, None] = None,
                 photo: Union[str, None] = None,
                 cart: List = [],
                 last_registration: datetime = datetime.now(),
                 first_registration: datetime = datetime.now()):
        self.id = id
        self.full_name = full_name
        self.username = username
        self.phone = phone
        self.description = description
        self.link = link
        self.photo = photo
        self.cart = cart
        self.last_registration = last_registration
        self.first_registration = first_registration


