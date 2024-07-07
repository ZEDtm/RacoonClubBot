from models.user import User
from store.mongostore.user_repository import UserRepository
from store.mongostore.calendar_repository import EventRepository, ArchiveRepository

class Repository:
    def __init__(self, db):
        self.users: UserRepository = db.user_repository
        self.events: EventRepository = db.event_repository
        self.archives: ArchiveRepository = db.archive_repository