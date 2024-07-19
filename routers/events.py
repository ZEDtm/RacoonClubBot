import os
import uuid
from datetime import datetime, timedelta
from typing import List

from fastapi import APIRouter, Request, Depends, File, UploadFile, Query
from http import HTTPStatus
from internal.dto.events_dto import EventDTO
from internal.services.events_service import EventsService



class EventsRouters:
    def __init__(self, application):
        self.application = application
        self.app = application.app
        self.router = APIRouter()

    def get_router(self):
        self.add_routes()
        return self.router

    def add_routes(self):
        @self.router.post("/events/draws/new",
                          tags=['draws'],
                          response_description="Add new events to draws",
                          response_model=EventDTO,
                          status_code=HTTPStatus.CREATED,
                          response_model_by_alias=False,
                          )
        async def create_new_event_draw(draws_events_service: EventsService =
                                        Depends(self.application.services.draws_events)
                                        ):
            draw_data = {
                "name": "Черновик",
                "description": "Это мероприятие будет сохранено в черновик",
                "link": {"url": "fytebit.com", "text": "Ссылка"},
                "price": 0.0,
                "main_image": {"src": "/static/_event_image.png", "file_id": "StdImage"},
                "images": [],
                "date_time": {
                    "start": (datetime.now() + timedelta(days=7)).isoformat(),
                    "end": (datetime.now() + timedelta(days=18)).isoformat(),
                },
                "subscriptions": [],
                "services": [],
                "editor": None  # TODO
            }
            draw, error = await draws_events_service.create(EventDTO(**draw_data))
            if error:
                raise HTTPStatus.INTERNAL_SERVER_ERROR
            return draw

        @self.router.get("/events/draws/getByID/{draw_id}",
                         tags=['draws'],
                         response_description="Get event by ID",
                         response_model=EventDTO,
                         status_code=HTTPStatus.OK,
                         response_model_by_alias=False,
                         )
        async def get_event_draw_by_id(draw_id: str,
                                       draws_events: EventsService = Depends(self.application.services.draws_events)):
            draw, error = await draws_events.find_by_id(event_id=draw_id)
            if error:
                raise HTTPStatus.NOT_FOUND
            return draw

        @self.router.get("/events/draws/all",
                         tags=['draws'],
                         response_description="List all events draws",
                         response_model=List[EventDTO],
                         status_code=HTTPStatus.OK,
                         response_model_by_alias=False,
                         )
        async def get_events_draws_all(
                limit: int = Query(10, description="Number of items to return"),
                skip: int = Query(0, description="Number of items to skip"),
                draws_events_service: EventsService = Depends(self.application.services.draws_events)):
            draws, error = await draws_events_service.get_all(skip=skip, limit=limit)
            if error:
                raise HTTPStatus.INTERNAL_SERVER_ERROR
            return draws

        @self.router.post("/events/draw/update/{draw_id}",
                          tags=['draws'],
                          response_description="Update draw",
                          response_model=EventDTO,
                          status_code=HTTPStatus.OK,
                          response_model_by_alias=False,
                          )
        async def update_event_draw(
                draw_id: str,
                updated_draw: EventDTO,
                draws_events_service: EventsService = Depends(self.application.services.draws_events)
        ):
            updated_draw.id = draw_id
            draw, error = await draws_events_service.update(updated_draw)
            # if error:
            #     raise HTTPStatus.INTERNAL_SERVER_ERROR
            return draw

        @self.router.post("/events/draws/upload/image/{draw_id}",
                          tags=['draws'],
                          response_description="Add image to event",
                          status_code=HTTPStatus.OK,
                          response_model_by_alias=False,
                          )
        async def upload_draw_image(
                draw_id: str,
                image: UploadFile = File(...),
        ):
            file_extension = image.filename.split('.')[-1]
            file_name = f"{uuid.uuid4()}.{file_extension}"
            folder_name = f"static/{draw_id}/"
            if not os.path.exists(folder_name):
                os.makedirs(folder_name)
            file_path = folder_name + file_name
            with open(file_path, "wb") as buffer:
                buffer.write(await image.read())
            image_url = "/" + file_path

            return image_url

        @self.router.delete("/events/draw/delete/{draw_id}",
                            tags=['draws'],
                            response_description="Delete draw",
                            status_code=HTTPStatus.OK,
                            response_model_by_alias=False,
                            )
        async def delete_event(
                draw_id: str,
                draws_events_service: EventsService = Depends(self.application.services.draws_events)
        ):
            success = await draws_events_service.delete(draw_id)
            if not success:
                raise HTTPStatus.INTERNAL_SERVER_ERROR
            return HTTPStatus.OK

        @self.router.post("/events/draws/addFromEvents/{event_id}",
                          tags=['draws'],
                          response_description="Add draw from events",
                          status_code=HTTPStatus.OK,
                          response_model_by_alias=False,
                          )
        async def add_draw_from_event(event_id: str,
                                      events_service: EventsService = Depends(self.application.services.events),
                                      draws_events_service: EventsService = Depends(self.application.services.draws_events)
                                      ):
            event, error = await events_service.find_by_id(event_id=event_id)
            if error:
                raise HTTPStatus.INTERNAL_SERVER_ERROR
            event.id = None
            draw, error = await draws_events_service.create(event=event)
            if error:
                raise HTTPStatus.INTERNAL_SERVER_ERROR
            success = await events_service.delete(event_id=event_id)
            if not success:
                raise HTTPStatus.CONFLICT
            return event.id

        @self.router.post("/events/addFromDraft/{draw_id}",
                          tags=['events'],
                          response_description="Add event from draws",
                          status_code=HTTPStatus.OK,
                          response_model_by_alias=False,
                          )
        async def add_event_from_draw(draw_id: str,
                                      draws_events_service: EventsService = Depends(self.application.services.draws_events),
                                      events_service: EventsService = Depends(self.application.services.events)):
            draw, error = await draws_events_service.find_by_id(event_id=draw_id)
            if error:
                raise HTTPStatus.INTERNAL_SERVER_ERROR
            draw.id = None
            event, error = await events_service.create(event=draw)
            if error:
                raise HTTPStatus.INTERNAL_SERVER_ERROR
            success = await draws_events_service.delete(event_id=draw_id)
            if not success:
                raise HTTPStatus.CONFLICT
            return event.id

        @self.router.get("/events/all",
                         tags=['events'],
                         response_description="List all events",
                         response_model=List[EventDTO],
                         status_code=HTTPStatus.OK,
                         response_model_by_alias=False,
                         )
        async def get_events_all(
                limit: int = Query(10, description="Number of items to return"),
                skip: int = Query(0, description="Number of items to skip"),
                events_service: EventsService = Depends(self.application.services.events)):
            events, error = await events_service.get_all(skip=skip, limit=limit)
            if error:
                raise HTTPStatus.INTERNAL_SERVER_ERROR
            return events

        @self.router.get("/events/getByID/{event_id}",
                         tags=['events'],
                         response_description="Get event by ID",
                         response_model=EventDTO,
                         status_code=HTTPStatus.OK,
                         response_model_by_alias=False,
                         )
        async def get_event_by_id(event_id: str, events: EventsService = Depends(self.application.services.events)):
            event, error = await events.find_by_id(event_id=event_id)
            if error:
                raise HTTPStatus.NOT_FOUND
            return event

        @self.router.post("/events/update/{event_id}",
                          tags=['events'],
                          response_description="Update event",
                          response_model=EventDTO,
                          status_code=HTTPStatus.OK,
                          response_model_by_alias=False,
                          )
        async def update_event(
                event_id: str,
                request: Request,
                events_service: EventsService = Depends(self.application.services.events)
        ):
            body = await request.json()
            updated_event = EventDTO(**body)
            updated_event.id = event_id
            event, error = await events_service.update(updated_event)
            if error:
                raise HTTPStatus.INTERNAL_SERVER_ERROR
            return event

        @self.router.delete("/events/delete/{event_id}",
                            tags=['events'],
                            response_description="Delete event",
                            status_code=HTTPStatus.OK,
                            response_model_by_alias=False,
                            )
        async def delete_event(
                event_id: str,
                events_service: EventsService = Depends(self.application.services.events)
        ):
            success = await events_service.delete(event_id)
            if not success:
                raise HTTPStatus.INTERNAL_SERVER_ERROR
            return HTTPStatus.OK

        @self.router.post("/events/upload/image/{event_id}",
                          tags=['events'],
                          response_description="Add image to event",
                          status_code=HTTPStatus.OK,
                          response_model_by_alias=False,
                          )
        async def upload_event_image(
                event_id: str,
                image: UploadFile = File(...),
        ):
            file_extension = image.filename.split('.')[-1]
            file_name = f"{uuid.uuid4()}.{file_extension}"
            folder_name = f"static/{event_id}/"
            if not os.path.exists(folder_name):
                os.makedirs(folder_name)
            file_path = folder_name + file_name
            with open(file_path, "wb") as buffer:
                buffer.write(await image.read())
            image_url = "/" + file_path

            return image_url
