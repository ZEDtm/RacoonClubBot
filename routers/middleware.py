import time

from fastapi import FastAPI, Request
from logger import logger


class Middleware:
    def __init__(self, application):
        @application.app.middleware("http")
        async def add_process_time_header(request: Request, call_next):
            start_time = time.time()
            response = await call_next(request)
            process_time = (time.time() - start_time) * 1000

            application.log.info(f"request to {request.url.path} processed in {process_time:.2f} ms")
            return response
