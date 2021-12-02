from fastapi import FastAPI, File, UploadFile , Request , Form
from fastapi.middleware.cors import CORSMiddleware

import logging
logging.getLogger().setLevel(logging.INFO)
import os

app = FastAPI()

PATH_TO_STORE_FILES = './shared-volume'



# allow comunication on all adress (even from localhost)
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"info": "U can upload a file at /uploadFile",
            "status" : "OK"}

@app.post("/uploadFile")
async def create_file(session_id : str = Form( ... ) , file: UploadFile = File( ... ) ):
    try:
        # TODO : sanitize session_id
        logging.info(f'file recived : {file.filename} , session_i : {session_id}')
        file2store = await file.read()
        fn = file.filename
        os.makedirs(os.path.dirname(f'{PATH_TO_STORE_FILES}/{session_id}/'), exist_ok=True)
        with open(f'{PATH_TO_STORE_FILES}/{session_id}/{fn}', 'wb') as f:
            f.write(file2store)
        logging.info(f'file downloaded: {fn}')
        return {"status": "OK"}
    except Exception as err:
        logging.error(f'could not print FORMDATA: {err}')
        return {"status": "ERR"}


@app.post("/convertFiles")
async def send_convert_signal(session_id : str = Form(...)):
    try:
        # TODO : sanitize session_id
        logging.info(f'convertiong files for session_id : {session_id}')
        
        return {"status": "OK"}
    except Exception as err:
        logging.error(f'could covert files for session_id {session_id}: {err}')
        return {"status": "ERR"}



  
###################
### DEBUG TOOLS ###
################### 
      
async def print_request(request):
    logging.info(f'request header       : {dict(request.headers.items())}' )
    logging.info(f'request query params : {dict(request.query_params.items())}')  
    try : 
        logging.info(f'request json         : {await request.json()}')
    except Exception as err:
        # could not parse json
        logging.info(f'request body         : {await request.body()}')


@app.post("/printREQUEST")
async def create_file(request: Request):
    try:
        await print_request(request)
        return {"status": "OK"}
    except Exception as err:
        logging.error(f'could not print REQUEST: {err}')
        return {"status": "ERR"}