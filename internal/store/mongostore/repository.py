from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase, AsyncIOMotorCollection
from typing import List, Any, Optional
from pydantic import BaseModel
from pymongo.results import InsertOneResult, UpdateResult


class Repository:

    def __init__(self, db: AsyncIOMotorDatabase, collection: str) -> None:
        self._db: AsyncIOMotorDatabase = db
        self._collection: AsyncIOMotorCollection = db.get_collection(name=collection)

    async def get_all(self, skip: int = 0, limit: int = 100) -> List[Any]:
        documents = self._collection.find().skip(skip).limit(limit)
        return await documents.to_list(length=limit) if documents else None

    async def find_by_id(self, _id: str | ObjectId) -> Optional[Any]:
        if isinstance(_id, str):
            _id = ObjectId(_id)
        document = await self._collection.find_one({'_id': _id})
        return document if document else None

    async def create(self, _dto: BaseModel) -> Optional[Any]:
        result = await self._collection.insert_one(_dto.model_dump(exclude_none=True))
        if result.acknowledged:
            return result.inserted_id
        return None

    async def update(self, _dto: BaseModel) -> ObjectId | None:
        _id = _dto.id
        if isinstance(_id, str):
            _id = ObjectId(_dto.id)
        _dto.id = None
        result = await self._collection.update_one(
            {'_id': _id},
            {'$set': _dto.model_dump(exclude_none=True)}
        )
        if result.acknowledged:
            return _id
        return None

    async def delete(self, _id: str | ObjectId) -> bool:
        if isinstance(_id, str):
            _id = ObjectId(_id)
        result = await self._collection.delete_one({'_id': _id})
        return result.deleted_count > 0
