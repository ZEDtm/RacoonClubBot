import yaml

with open('config.yaml', 'r', encoding='utf-8') as file:
    conf = yaml.safe_load(file)

MONGO_LOGIN = conf['MONGO_LOGIN']
MONGO_PASS = conf['MONGO_PASS']
TOKEN = conf['TOKEN']
HOST = conf['HOST']
MONGO_CONNECTION = conf['MONGO_CONNECTION']

IMAGES_DIR = "static"
