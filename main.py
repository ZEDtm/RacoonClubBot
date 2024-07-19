import asyncio
from contextlib import asynccontextmanager
import time

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from fastapi.staticfiles import StaticFiles
from tqdm import tqdm

from bot import bot_create
from config import Config
from internal.store.mongostore.store import MongoDB
from routers import webhook
from routers.users import UserRouters
from routers.events import EventsRouters
from routers.auth import AuthRouters
from routers.middleware import Middleware
from internal.services.service import Services
from logger import Logger
from utils.image_manager import ImageManager

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


class Application:
    def __init__(self):
        self.app = FastAPI(lifespan=self.lifespan)
        self.config = Config(self)
        self.connector = MongoDB(connection=self.config.MONGO_CONNECTION)
        self.services = None
        self.middleware = Middleware(self)
        self.log = Logger()
        self.image_manager = ImageManager(self)



    @asynccontextmanager
    async def lifespan(self, app: FastAPI):
        await bot_create.on_startup()
        yield
        await self.connector.close()
        await bot_create.on_shutdown()
        self.log.warning('server stop at')

    def add_headers(self):
        self.app.add_middleware(
                CORSMiddleware,
                allow_origins=["*"],  # Allow requests from any domain
                allow_credentials=True,
                allow_methods=["*"],  # Allow all HTTP methods
                allow_headers=["*"],  # Allow all headers
                expose_headers=["Access-Control-Allow-Private-Network"]
        )

    def add_static_path(self):

        self.app.mount(f"/{self.config.IMAGES_DIR}", StaticFiles(directory=self.config.IMAGES_DIR), name="static")

    def include_routes(self):
        self.app.include_router(webhook.router)
        self.app.include_router(AuthRouters(self).get_router())
        self.app.include_router(EventsRouters(self).get_router())
        self.app.include_router(UserRouters(self).get_router())

    def setup_services(self):
        db = self.connector.get_database(db_name="test")
        self.services = Services(db=db)

    def create_app(self):
        start_time = time.time()
        jobs = [self.add_headers, self.add_static_path, self.setup_services, self.include_routes]
        for job in tqdm(range(len(jobs)), desc="Create App", ascii=False, ncols=75):
            jobs[job]()
        process_time = (time.time() - start_time) * 1000
        self.log.info(f"process create in {process_time:.2f} ms")
        return self.app





if __name__ == '__main__':
    app = Application().create_app()
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, use_colors=True)


# @app.get("/protected_endpoint/")
# async def protected_endpoint(current_user: User = Depends(get_current_active_user)):
#     return {"message": "This is a protected endpoint", "user": current_user}
#
#
# @app.get("/admin_endpoint/")
# async def admin_endpoint(current_user: User = Depends(get_current_admin_user)):
#     return {"message": "This is an admin endpoint", "user": current_user}



