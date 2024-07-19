import yaml

from aiogram import Bot, Dispatcher
from aiogram.fsm.storage.memory import MemoryStorage
from config import TOKEN

# Загрузка переводов для текста
with open('bot/language.yaml', 'r', encoding='utf-8') as file:
    _ = yaml.safe_load(file)


storage = MemoryStorage()
bot = Bot(token=TOKEN)
dp = Dispatcher(storage=storage)
