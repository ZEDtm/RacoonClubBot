from store.repository import UserRepository
from store.mongostore.store import MongoDB
from models.user import User


def main():
    db = MongoDB()
    users = db.user_repository
    # Create a new user
    new_user = User("1", "JOHN PEHN")
    print(f"Created user: {new_user}")

    # Save the user to the database 
    users.create(new_user)

main()


