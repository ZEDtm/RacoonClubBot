import yaml

from aiogram import Bot, Dispatcher
from aiogram.fsm.storage.memory import MemoryStorage
import yaml

with open('config.yaml', 'r', encoding='utf-8') as file:
    conf = yaml.safe_load(file)

# Загрузка переводов для текста
with open('bot/language.yaml', 'r', encoding='utf-8') as file:
    _ = yaml.safe_load(file)

TOKEN = conf['TOKEN']
storage = MemoryStorage()
bot = Bot(token=TOKEN)
dp = Dispatcher(storage=storage)
