import logging
import os
import uuid
from datetime import datetime, timedelta
from typing import List

from fastapi import APIRouter, Request, Depends, File, UploadFile, Query, Body, FastAPI
from http import HTTPStatus
from internal.dto.events_dto import EventDTO
from internal.services.events_service import EventsService


from fastapi.logger import logger as fastapi_logger




class UserRouters:
    def __init__(self, application):
        self.application = application
        self.app = application.app
        self.router = APIRouter()

    def get_router(self):
        self.add_routes()
        return self.router

    def add_routes(self):
        @self.router.get("/users/new", tags=['users'])
        async def create_new_event_draw(event_service: EventsService = Depends(self.application.services.events)):
            all = await event_service.get_all()
            return {"message": all}

        #                tags=['users'],
        #                response_description="Add an invitation for a future user",
        #                response_model=EventDTO,
        #                status_code=HTTPStatus.CREATED,
        #                response_model_by_alias=False)
        # async def create_new_event_draw(draws_events_service: EventsService = Depends(get_draws_events_service)):
        #     draw_data = {
        #         "name": "Черновик",
        #         "description": "Это мероприятие будет сохранено в черновик",
        #         "link": {"url": "fytebit.com", "text": "Ссылка"},
        #         "price": 0.0,
        #         "main_image": {"src": "/static/_event_image.png", "file_id": "StdImage"},
        #         "images": [],
        #         "date_time": {
        #             "start": (datetime.now() + timedelta(days=7)).isoformat(),
        #             "end": (datetime.now() + timedelta(days=18)).isoformat(),
        #         },
        #         "subscriptions": [],
        #         "services": [],
        #         "editor": None  # TODO
        #     }
        #     draw, error = await draws_events_service.create(EventDTO(**draw_data))
        #     if error:
        #         raise HTTPException(status_code=HTTPStatus.INTERNAL_SERVER_ERROR)
        #     return draw