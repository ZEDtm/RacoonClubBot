from pymongo import MongoClient

from models.user import User


class UserRepository:
    def __init__(self, client: MongoClient):
        self.client = client
        self.collection = self.client.users  # Предполагается, что у вас есть коллекция в MongoDB

    def find(self, query):
        # Найти документы, соответствующие запросу и преобразовать их в экземпляры класса User
        documents = self.collection.find(query)
        return [self._document_to_user(doc) for doc in documents]

    def find_by_id(self, user_id):
        # Найти документ по идентификатору и преобразовать его в экземпляр класса User
        document = self.collection.find_one({'_id': user_id})
        return self._document_to_user(document) if document else None

    def create(self, user: User):
        # Преобразовать экземпляр класса User в словарь и вставить его в коллекцию
        user_dict = user.__dict__
        result = self.collection.insert_one(user_dict)
        return result.inserted_id

    def _document_to_user(self, document):
        # Метод для преобразования сырых данных из MongoDB в экземпляр класса User
        return User(**document)
