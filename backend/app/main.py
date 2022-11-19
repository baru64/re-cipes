import logging
from typing import List
from hashlib import sha512
import base64
import uuid

from fastapi import Depends, FastAPI, HTTPException
from starlette.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

logging.basicConfig(
    level=logging.DEBUG,
    format="[%(asctime)s.%(msecs)03d] [%(levelname)s] %(name)s: %(message)s",
    datefmt="%Y-%m-%d:%H:%M:%S",
)

logger = logging.getLogger(__name__)

origins = [
    "http://localhost",
    "http://localhost:8080",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/items/", response_model=List[schemas.Item], tags=["items"])
def read_reports(db: Session = Depends(get_db)):
    return crud.get_items(db)


@app.get("/items/{item_id}", response_model=schemas.Item, tags=["items"])
def read_report(report_id: int, db: Session = Depends(get_db)):
    report = crud.get_item(db, report_id)
    if report is None:
        raise HTTPException(status_code=404, detail="Report not found")
    return report
