from fastapi.middleware.cors import CORSMiddleware

from fastapi import APIRouter, Request
from auth import telegram_auth, jwt_auth

router = APIRouter()


@router.get("/auth/checkAuth")
async def check_auth(request: Request):
    return await jwt_auth.check_auth(request)


@router.post("/auth/telegramWebapp")
async def auth_telegram_webApp(request: Request):
    return await telegram_auth.auth_telegram_webApp(request)


@router.options("/auth/telegram")
async def custom_cors_handler(request):
    response = await CORSMiddleware(request)
    response.headers["Access-Control-Allow-Private-Network"] = "true"
    return response


@router.post("/auth/telegram")
async def auth_telegram(request: Request):
    return telegram_auth.auth_telegram(request)