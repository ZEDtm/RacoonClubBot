from fastapi.middleware.cors import CORSMiddleware

from fastapi import APIRouter, Request
from auth import telegram_auth, jwt_auth


class AuthRouters:
    def __init__(self, application):
        self.application = application
        self.app = application.app
        self.router = APIRouter()

    def get_router(self):
        self.add_routes()
        return self.router

    def add_routes(self):
        @self.router.get("/auth/checkAuth")
        async def check_auth(request: Request):
            return await jwt_auth.check_auth(request)

        @self.router.post("/auth/telegramWebapp")
        async def auth_telegram_webApp(request: Request):
            return await telegram_auth.auth_telegram_webApp(request)

        @self.router.options("/auth/telegram")
        async def custom_cors_handler(request):
            response = await CORSMiddleware(request)
            response.headers["Access-Control-Allow-Private-Network"] = "true"
            return response

        @self.router.post("/auth/telegram")
        async def auth_telegram(request: Request):
            return telegram_auth.auth_telegram(request)