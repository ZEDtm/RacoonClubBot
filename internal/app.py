from store.repository import Repository
from store.mongostore.store import MongoDB
from models.user import User
from models.calendar import Archive, Event


def main():
    db = MongoDB()
    repository = Repository(db)
    # Create a new user
    new_user = User("1", "JOHN PEHN")
    new_event = Event(name='123')
    print(f"Created user: {new_user}")
    print(f"Created event: {new_event}")

    # Save the user to the database 
    repository.users.create(new_user)
    repository.events.create(new_event)

main()