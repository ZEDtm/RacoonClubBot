from pymongo import MongoClient

from store.mongostore import user_repository


class MongoDB():
    def __init__(self):
        self.client = MongoClient('mongodb+srv://gooayyatut:O6zUus0rAyn2VRF9@zdb.bf1hgsv.mongodb.net/?retryWrites=true&w=majority&appName=zdb')
        self.user_repository = user_repository.UserRepository(self.client['test']['users'])