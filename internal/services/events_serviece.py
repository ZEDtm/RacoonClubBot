from typing import List, Optional, Tuple, Any
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase, AsyncIOMotorCollection

from internal.store.mongostore.repository import Repository
from internal.dto.events_dto import EventDTO


class EventsService:
    def __init__(self, db: AsyncIOMotorDatabase, collection: str) -> None:
        self._repo: Repository = Repository(db=db, collection=collection)

    async def get_all(self, skip: int = 0, limit: int = 10) -> tuple[list[EventDTO], None] | tuple[list[Any], bool]:
        documents = await self._repo.get_all(skip, limit)
        if documents:
            return [await self._doc_to_dto(document) for document in documents], None
        return [], True

    async def find_by_id(self, event_id: str | ObjectId) -> tuple[EventDTO, None] | tuple[None, True]:
        document = await self._repo.find_by_id(event_id)
        if document:
            return await self._doc_to_dto(document), None
        return None, True

    async def create(self, event: EventDTO) -> tuple[EventDTO, None] | tuple[None, True]:
        event_id = await self._repo.create(event)
        document = await self._repo.find_by_id(event_id)
        if document:
            return await self._doc_to_dto(document), None
        return None, True

    async def update(self, event: EventDTO) -> tuple[EventDTO, None] | tuple[None, True]:
        event_id = await self._repo.update(event)
        document = await self._repo.find_by_id(event_id)
        if document:
            return await self._doc_to_dto(document), None
        return None, True

    async def delete(self, event_id: str | ObjectId) -> bool:
        result = await self._repo.delete(event_id)
        return result

    async def _doc_to_dto(self, doc):
        return EventDTO(**doc)
