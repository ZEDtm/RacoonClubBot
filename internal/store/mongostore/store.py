from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase


class MongoDB:
    """
    A class to interact with MongoDB using the Motor asynchronous driver.

    Attributes:
        _client (AsyncIOMotorClient): The asynchronous MongoDB client.
    """

    def __init__(self, connection: str) -> None:
        """
        Initializes the MongoDB client with the provided connection string.

        Args:
            connection (str): The MongoDB connection string.
        """
        self._client: AsyncIOMotorClient = AsyncIOMotorClient(connection)

    def get_database(self, db_name: str) -> AsyncIOMotorDatabase:
        """
        Retrieves a database from the MongoDB client.

        Args:
            db_name (str): The name of the database to retrieve.

        Returns:
            AsyncIOMotorDatabase: The requested database.
        """
        return self._client.get_database(name=db_name)

    async def close(self) -> None:
        """
        Closes the MongoDB client connection.
        Returns:
            None
        """

        self._client.close()
