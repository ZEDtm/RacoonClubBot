from models.user import User

class UserRepository:
    def __init__(self, db):
        self.store = db.user_repository

    def find(self, query):
        return self.db.find(query)
    
    
    def findById(self, query):
        return self.db.findById(query)


    def create(self, user: User):
        return self.db.create(user)

    