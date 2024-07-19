import io
import os
import uuid
from typing import Any, Optional

import aiofiles
from fastapi import UploadFile
from PIL import Image


class ImageManager:
    def __init__(self, application):
        self.application = application

    def image_uploader(self):
        return ImageUploader(application=self.application)


class ImageUploader:
    def __init__(self, application):
        self.application = application

    async def upload_image(self, path: str, _id: str, image: UploadFile) -> tuple[Any, Optional[str]]:
        file_extension = image.filename.split('.')[-1]
        if file_extension.lower() not in ['jpg', 'jpeg', 'png']:
            return None, f'Unsupported file format. Expected: jpg ,jpeg, png, but transferred {file_extension.lower()}'

        file_name = f"{uuid.uuid4()}.{file_extension}"
        folder_name = f"{self.application.config.IMAGES_DIR}/{path}/{_id}/"
        if not os.path.exists(folder_name):
            os.makedirs(folder_name)

        # Save original image
        file_path = folder_name + file_name
        async with aiofiles.open(file_path, "wb") as buffer:
            await buffer.write(await image.read())

        # Convert to WebP
        try:
            webp_path = await ImageUploader.__convert_image(file_path)
        except Exception as e:
            self.application.log.warning(f'ImageManager excepted exception: {e}')
            return None, str(e)

        image_url = "/" + webp_path
        return image_url, None

    @staticmethod
    async def __convert_image(image_path):
        async with aiofiles.open(image_path, mode='rb') as f:
            image_bytes = await f.read()

        im = Image.open(io.BytesIO(image_bytes))
        im = im.convert('RGB')

        image_name, _ = os.path.splitext(image_path)
        file = f"{image_name}.webp"

        buffer = io.BytesIO()
        im.save(buffer, 'webp')
        buffer.seek(0)
        async with aiofiles.open(file, mode='wb') as f:
            await f.write(buffer.getvalue())
        return file
