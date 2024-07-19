from typing import Union, Dict, Any

from aiogram.filters import BaseFilter
from aiogram.types import Message, Contact


class ContactFilter(BaseFilter):
    async def __call__(self, message: Message) -> Union[bool, Dict[str, Any]]:
        return True if type(message.contact) == Contact else False