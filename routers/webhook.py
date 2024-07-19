from fastapi import APIRouter, Request
from bot import bot_create

router = APIRouter()


@router.post("/webhook")
async def webhook(request: Request):
    data = await request.json()
    await bot_create.webhook(data)
    return {"status": "ok"}