from motor.motor_asyncio import AsyncIOMotorDatabase

from internal.services.events_serviece import EventsService


class Services:
    _instance_count = 0

    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        Services._instance_count += 1

    def events(self, collection: str = "events") -> EventsService:
        return EventsService(db=self.db, collection=collection)

    def draws_events(self, collection: str = "draws_events") -> EventsService:
        return EventsService(db=self.db, collection=collection)

    @classmethod
    def get_instance_count(cls):
        return cls._instance_count

