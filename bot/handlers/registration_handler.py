from aiogram import Router, F
from aiogram.types import Message, CallbackQuery, Contact, ReplyKeyboardRemove
from aiogram.filters import Command

from bot.calldata.calldata import CartItemData
from bot.keyboards.for_registration_handler import phone_request

from bot.filters.filters import ContactFilter
from bot.config import _


router = Router()


@router.message(ContactFilter())
async def start(message: Message, lang: str) -> None:
    print(message.contact)
    """
    TODO:
        ОТПРАВКА АДМИНИСТРАТОРУ, СОХРАНЕНИЕ В БД
    """
    await message.answer(_[lang].get('0wzw'), reply_markup=ReplyKeyboardRemove())


async def start(message: Message, data: dict) -> None:
    lang = data['lang']
    await message.answer(_[lang].get('an1I'), reply_markup=phone_request(lang=lang))
