from store.repository import Repository
from store.mongostore.store import MongoDB
from models.user import User, Photo, Link, FullName


def main():
    db = MongoDB()
    repository = Repository(db)
    # Create a new user
    photo = Photo(file="photo.jpg")
    full_name = FullName("Иван", "Иванович", "Иванов")
    link = Link(text="Вася", url="vk.com")
    new_user = User(full_name=full_name, id="123", link=link, photo=photo)
    print(f"Created user: {new_user}")

    # Save the user to the database 
    repository.users.save_user(new_user)


main()