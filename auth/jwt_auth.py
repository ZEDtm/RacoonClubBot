from datetime import timedelta, datetime
import jwt
from fastapi import Request

ACCESS_TOKEN_EXPIRE_MINUTES = 30
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"


def create_access_token(user):
    """
    Creates a JWT token based on user.id
    """
    data = {"sub": user.get('id')}
    expires_delta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = data.copy()
    expire = datetime.now() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def check_auth(request: Request):
    """"TODO:
    ДОПИСАТЬ АВТОРИЗАЦИЮ ТОКЕНА"""
    token = request.headers.get('Authorization').split(' ')[1]
    user = await get_current_user(token)
    #await asyncio.sleep(3)
    return {"authenticated": True, "user": user}


async def get_current_user(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            return
    except jwt.PyJWTError:
        return

    """TODO:
    ПОЛУЧИТЬ ПОЛЬЗОВАТЕЛЯ ИЗ БД"""
    global g_user
    user = g_user
    if user is None:
        return
    return user


# async def get_current_active_user(current_user: User = Depends(get_current_user)):
#     return current_user
#
# async def get_current_admin_user(current_user: User = Depends(get_current_active_user)):
#     if current_user.role != "admin":
#         raise HTTPException(status_code=403, detail="Not enough permissions")
#     return current_user