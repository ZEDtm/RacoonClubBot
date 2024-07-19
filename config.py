import yaml


class Config:
    def __init__(self, application):
        self.DRAWS_PATH = None
        self.EVENTS_PATH = None
        self.IMAGES_DIR = None
        self.MONGO_CONNECTION = None
        self.HOST = None
        self.TOKEN = None
        self.MONGO_PASS = None
        self.MONGO_LOGIN = None
        self.application = application
        self.configurate()

    def configurate(self):
        with open('config.yaml', 'r', encoding='utf-8') as file:
            conf = yaml.safe_load(file)
            self.application.log.info(f'config: {conf}')

        self.MONGO_LOGIN = conf['MONGO_LOGIN']
        self.MONGO_PASS = conf['MONGO_PASS']
        self.TOKEN = conf['TOKEN']
        self.HOST = conf['HOST']
        self.MONGO_CONNECTION = conf['MONGO_CONNECTION']

        self.IMAGES_DIR = "static"
        self.EVENTS_PATH = "events"
        self.DRAWS_PATH = "draws"
