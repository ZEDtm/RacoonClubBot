import sys
from fastapi.logger import logging, logger


class Logger:
    def __init__(self):
        self.logger = logger
        self.configurate(self.logger)

        self.info = self.logger.info
        self.debug = self.logger.debug
        self.critical = self.logger.critical
        self.warning = self.logger.warning
        self.error = self.logger.error

    def configurate(self, logger):
        formatter = logging.Formatter(
            fmt="%(levelname)s:     [Application] %(message)s [%(asctime)s]",
            datefmt="%Y-%m-%d %H:%M:%S"
        )
        stream_handler = logging.StreamHandler(sys.stdout)
        file_handler = logging.FileHandler("log.log")
        stream_handler.setFormatter(formatter)
        file_handler.setFormatter(formatter)
        logger.handlers = [stream_handler, file_handler]
        logger.setLevel(logging.DEBUG)


