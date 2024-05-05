from pymongo import MongoClient

from models.user import User


class UserRepository:
    def __init__(self, client: MongoClient):
        self.client = client


    def find(self, query):
        return self.client.collection.find(query)


    def findById(self, query):
        return self.client.collection.find(query)


    def create(self, user: User):
        user_dict = user.__dict__
        return self.client.collection.insert_one(user_dict)

