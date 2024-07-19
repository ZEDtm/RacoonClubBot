from aiogram.filters.callback_data import CallbackData


class CartItemData(CallbackData, prefix='cart_item'):
    item_id: int
