import asyncio

from bot.handlers import menu_handlers, registration_handler
from bot.config import bot, dp
from bot.middlware.usercheck_middlware import UserCheckMessageMiddleware, UserCallbackCheckMiddleware
from aiogram.types import Update

dp.message.middleware.register(UserCheckMessageMiddleware())
dp.callback_query.middleware.register(UserCallbackCheckMiddleware())
dp.include_routers(registration_handler.router)
dp.include_routers(menu_handlers.router)


async def webhook(data):
    update = Update(**data)
    await dp.feed_update(bot=bot, update=update)


async def on_startup():
    webhook_url = "https://4077-193-47-242-96.ngrok-free.app/webhook"
    await bot.set_webhook(url=webhook_url)


async def on_shutdown():
    await bot.delete_webhook()


async def main():
    await dp.start_polling(bot)


if __name__ == '__main__':
    asyncio.run(main())