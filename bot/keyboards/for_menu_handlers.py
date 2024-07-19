from aiogram.utils.keyboard import InlineKeyboardBuilder, InlineKeyboardMarkup

from bot.calldata.calldata import CartItemData


def cart_keyboard(items_id: list) -> InlineKeyboardMarkup:
    simple_keyboard = InlineKeyboardBuilder()
    for item_id in items_id:
        simple_keyboard.button(text='*click', callback_data=CartItemData(item_id=item_id))
    simple_keyboard.adjust(1)
    return simple_keyboard.as_markup()
