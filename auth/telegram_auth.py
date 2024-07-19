import hashlib
from fastapi import Request
from urllib.parse import unquote, parse_qs
import hmac
import json
import time

from auth.jwt_auth import create_access_token, get_current_user
from config import TOKEN

async def auth_telegram_webApp(request: Request):
    data = await request.json()
    if not data['init_data']:
        return {"success": False, "error": "Empty data"}
    init_data = data['init_data']
    user, error = verify_telegram_data_webApp(init_data, TOKEN)
    if error:
        return {"success": False, "error": error}
    """
    TODO:
      ДОСТАТЬ ПОЛЬЗОВАТЕЛЯ ИЗ БД?
      """
    access_token = create_access_token(user)
    global g_user
    g_user = user
    return {"success": True, "access_token": access_token, "user": user}


async def auth_telegram(request: Request):
    data = await request.json()
    if not data['init_data']:
        return {"success": False, "error": "Empty data"}
    init_data = data['init_data']
    user, error = verify_telegram_data(init_data, TOKEN)
    if error:
        return {"success": False, "error": error}
    """
    TODO:
      ДОСТАТЬ ПОЛЬЗОВАТЕЛЯ ИЗ БД?
      """
    access_token = create_access_token(user)
    global g_user
    g_user = user
    return {"success": True, "access_token": access_token, "user": user}


def verify_telegram_data_webApp(init_data, bot_token):
    """
    Verifies data from Telegram.WebApp.InitData
    """
    vals = {k: unquote(v) for k, v in [s.split('=', 1) for s in init_data.split('&')]}
    data_check_string = '\n'.join(f"{k}={v}" for k, v in sorted(vals.items()) if k != 'hash')
    secret_key = hmac.new("WebAppData".encode(), bot_token.encode(), hashlib.sha256).digest()
    h = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256)
    if not h.hexdigest() == vals['hash']:
        return {}, "Data verification failed"
    auth_date = int(vals['auth_date'])
    if time.time() - auth_date > 86400:  # 24 hours
        return {}, "Data is outdated"
    user_data = json.loads(vals['user'])
    return user_data, None


def verify_telegram_data(init_data, bot_token):
    """
    Verifies data from Telegram
    """
    vals = init_data
    data_check_string = '\n'.join(f"{k}={v}" for k, v in sorted(vals.items()) if k != 'hash')
    secret_key = hashlib.sha256(bot_token.encode()).digest()
    h = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256)
    if not h.hexdigest() == vals['hash']:
        return {}, "Data verification failed"
    auth_date = int(vals['auth_date'])
    if time.time() - auth_date > 86400:  # 24 hours
        return {}, "Data is outdated"
    user_data = vals
    return user_data, None