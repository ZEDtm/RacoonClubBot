from aiogram import Router, F
from aiogram.types import Message, CallbackQuery
from aiogram.filters import Command

from bot.calldata.calldata import CartItemData
from bot.keyboards.for_menu_handlers import cart_keyboard

from bot.config import _


router = Router()


@router.message(Command("start"))
async def command_start(message: Message, lang: str) -> None:
    items_id = [1, 2, 3, 4]
    await message.answer(_[lang].get("Привет"),
                         reply_markup=cart_keyboard(items_id))


@router.callback_query(CartItemData.filter())
async def command_start(call: CallbackQuery, callback_data: CartItemData, user: dict) -> None:
    item_id = callback_data.item_id
    item = user['cart'][item_id]
    await call.message.answer(f"You pick {item['label']}")
