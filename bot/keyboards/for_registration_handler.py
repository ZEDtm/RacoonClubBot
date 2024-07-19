from aiogram.utils.keyboard import ReplyKeyboardBuilder, ReplyKeyboardMarkup

# from calldata.calldata import CartItemData
from bot.config import _


def phone_request(lang: str) -> ReplyKeyboardMarkup:
    keyboard = ReplyKeyboardBuilder()
    keyboard.button(text=_[lang].get('T8iX'), request_contact=True)
    keyboard.adjust(1)
    return keyboard.as_markup()
