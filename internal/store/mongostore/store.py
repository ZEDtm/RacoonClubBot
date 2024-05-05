from pymongo import MongoClient

from store.mongostore import user_repository


class MongoDB():
    def __init__(self):
        self.client = MongoClient('')
        self.user_repository = user_repository.UserRepository(self.client['test']['users'])