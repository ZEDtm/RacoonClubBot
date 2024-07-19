from typing import Callable, Dict, Any, Awaitable
from pymongo.collection import Collection
from aiogram import BaseMiddleware
from aiogram.types import Message, CallbackQuery

from bot.handlers.registration_handler import start

class UserCheckMessageMiddleware(BaseMiddleware):
    def __init__(self) -> None:
        self.user: Collection

    async def __call__(
        self,
        handler: Callable[[Message, Dict[str, Any]], Awaitable[Any]],
        event: Message,
        data: Dict[str, Any]
    ) -> Any:
        # self.user = users_db.find_one({'user_id': event.from_user.id})
        # if self.user:
        #     data['user'] = self.user
        #     return await handler(event, data)
        # else:
        #     cart = [{'label': 'SimpleText', 'count': 1}]
        #     new_user = User(
        #         user_id=event.from_user.id,
        #         cart=cart
        #     )
        #     result = users_db.insert_one(new_user())
        #     self.user = users_db.find_one({'_id': result.inserted_id})
        data['lang'] = event.from_user.language_code
        #     return await handler(event, data)
        return await handler(event, data)#await start(event, data)

class UserCallbackCheckMiddleware(BaseMiddleware):
    def __init__(self) -> None:
        self.user: Collection

    async def __call__(
        self,
        handler: Callable[[CallbackQuery, Dict[str, Any]], Awaitable[Any]],
        event: CallbackQuery,
        data: Dict[str, Any]
    ) -> Any:
        #self.user = users_db.find_one({'user_id': event.from_user.id})
        # if self.user:
        #     data['user'] = self.user
        #     return await handler(event, data)
        # else:
        #     new_user = User(
        #         user_id=event.from_user.id,
        #         cart=[]
        #     )
        #     result = users_db.insert_one(new_user())
        #     self.user = users_db.find_one({'_id': result.inserted_id})
        #     data['user'] = self.user
        return await handler(event, data)
