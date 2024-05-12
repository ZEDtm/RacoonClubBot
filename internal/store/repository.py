from models.user import User

class Repository:
    def __init__(self, db):
        self.users = db.user_repository
        self.events = db.events_repository
        self.archives = db.archive_repository