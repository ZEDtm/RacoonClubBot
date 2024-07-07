from pymongo import MongoClient
from datetime import datetime, timedelta
from typing import Union, List
from internal.models.event import Event, Archive, Product


class EventRepository:
    def __init__(self, client: MongoClient):
        self.client = client
        self.collection = self.client.event

    def find(self, query):
        documents = self.collection.find(query)
        return [self._document_to_event(doc) for doc in documents]

    def find_by_id(self, event_id):
        document = self.collection.find_one({'_id': event_id})
        return self._document_to_event(document) if document else None

    def create(self, event: Event):
        event_dict = event.__dict__
        result = self.collection.insert_one(event_dict)
        return result.inserted_id

    def _document_to_event(self, document):

        # Дополнительная логика для преобразования вложенных документов в объекты User и Product
        return Event(**document)
    

class ArchiveRepository:
    def __init__(self, client: MongoClient):
        self.client = client
        self.collection = self.client.archive
    
    def find(self, query):
        documents = self.collection.find(query)
        return [self._document_to_archive(doc) for doc in documents]

    def find_by_id(self, archive_id):
        document = self.collection.find_one({'_id': archive_id})
        return self._document_to_archive(document) if document else None

    def create(self, archive: Archive):
        archive_dict = archive.__dict__
        result = self.collection.insert_one(archive_dict)
        return result.inserted_id

    def _document_to_event(self, document):

        # Дополнительная логика для преобразования вложенных документов в объекты User и Product
        return Archive(**document)

