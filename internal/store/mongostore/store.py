from pymongo import MongoClient

from store.mongostore import user_repository, calendar_repository


class MongoDB():
    def __init__(self):
        self.client = MongoClient('')
        self.user_repository = user_repository.UserRepository(self.client['test'])
        self.event_repository = calendar_repository.EventRepository(self.client['test'])
        self.archive_repository = calendar_repository.ArchiveRepository(self.client['test'])