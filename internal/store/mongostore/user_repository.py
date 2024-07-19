from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase, AsyncIOMotorCollection
from typing import List, Any, Optional
from pydantic import BaseModel
from pymongo.results import InsertOneResult, UpdateResult

from internal.store.mongostore.repository import Repository


class UserRepository(Repository):
    def __init__(self, db: AsyncIOMotorDatabase, collection: str) -> None:
        super().__init__(db, collection)

    async def find_by_username(self, username: str) -> Optional[Any]:
        document = await self._collection.find_one({'username': username})
        return document if document else None

    async def update_by_username(self, username: str, update_data: dict) -> bool:
        result = await self._collection.update_one(
            {'username': username},
            {'$set': update_data}
        )
        return result.modified_count > 0