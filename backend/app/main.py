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

# recipes

@app.get("/recipes/", response_model=List[schemas.RecipeResponse], tags=["recipes"])
def read_recipes(db: Session = Depends(get_db)):
    return crud.get_recipes(db)


@app.get("/recipes-pretty/", response_model=List[schemas.RecipeExtended], tags=["recipes"])
def read_recipes_pretty(db: Session = Depends(get_db)):
    recipes =  [schemas.RecipeResponse.from_orm(r) for r in crud.get_recipes(db)]
    extended_recipes = []
    all_ingredients = [schemas.Ingredient.from_orm(i) for i in crud.get_ingredients(db)]
    for r in recipes:
        picture_path = None
        if r.picture_id is not None:
            pic = schemas.Picture.from_orm(crud.get_picture(db, r.picture_id))
            picture_path = pic.path
        ingredients = []
        for i in r.ingredients:
            ingr = schemas.Ingredient.from_orm(crud.get_ingredient(db, i.ingredient_id))
            ipic = None
            if ingr.picture_id is not None:
                ipics = crud.get_picture(db, ingr.picture_id)
                ipicso = schemas.Picture.from_orm(ipics)
                ipic = ipicso.path
            ingredients.append(schemas.IngredientInfo(
                id=ingr.id,
                image=ipic,
                name=ingr.name,
                amount=i.amount,
                unit=ingr.amount_unit
            ))
        e = schemas.RecipeExtended(
            id=r.id,
            name=r.name,
            description=r.description,
            steps=r.description.splitlines() if r.description is not None else None,
            image=picture_path,
            eco_score=r.eco_score,
            ingredients=ingredients
        )
        extended_recipes.append(e)

    return extended_recipes


@app.get("/recipes/{recipe_id}", response_model=schemas.RecipeResponse, tags=["recipes"])
def read_recipe(recipe_id: int, db: Session = Depends(get_db)):
    recipe = crud.get_recipe(db, recipe_id)
    if recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return recipe


@app.post("/recipes/", response_model=schemas.RecipeResponse, tags=["recipes"])
def create_recipe(create_request: schemas.RecipeCreate, db: Session = Depends(get_db)):
    return crud.create_recipe(db, create_request)

# products

@app.get("/products/", response_model=List[schemas.Product], tags=["products"])
def read_products(db: Session = Depends(get_db)):
    return crud.get_products(db)


@app.get("/products/{product_id}", response_model=schemas.Product, tags=["products"])
def read_product(product_id: int, db: Session = Depends(get_db)):
    recipe = crud.get_product(db, product_id)
    if recipe is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return recipe


@app.post("/products/", response_model=schemas.Product, tags=["products"])
def create_product(create_request: schemas.ProductCreate, db: Session = Depends(get_db)):
    return crud.create_product(db, create_request)

# ingredients

@app.get("/ingredients/", response_model=List[schemas.Ingredient], tags=["ingredients"])
def read_ingredients(db: Session = Depends(get_db)):
    return crud.get_ingredients(db)


@app.get("/ingredients/{ingredient_id}", response_model=schemas.Ingredient, tags=["ingredients"])
def read_ingredient(ingredient_id: int, db: Session = Depends(get_db)):
    recipe = crud.get_ingredient(db, ingredient_id)
    if recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return recipe


@app.post("/ingredients/", response_model=schemas.Ingredient, tags=["ingredients"])
def create_ingredient(create_request: schemas.IngredientCreate, db: Session = Depends(get_db)):
    return crud.create_ingredient(db, create_request)

# pictures

@app.post("/pictures/", response_model=schemas.Picture, tags=["pictures"])
def upload_picture(
    create_request: schemas.PictureUpload, db: Session = Depends(get_db)
):
    name = uuid.uuid4()
    image_path = f"{name}.JPG"
    image_bytes = base64.b64decode(create_request.img)
    with open(f"data/{image_path}", "wb+") as f:
        f.write(image_bytes)
    picture_create = schemas.PictureCreate(
        path=image_path
    )
    return crud.create_picture(db, picture_create)


@app.post("/pictures/from-path", response_model=schemas.Picture, tags=["pictures"])
def create_picture(
    create_request: schemas.PictureCreate, db: Session = Depends(get_db)
):
    return crud.create_picture(db, create_request)

# ratings

@app.get("/ratings/", response_model=List[schemas.Rating], tags=["ratings"])
def read_ratings(db: Session = Depends(get_db)):
    return crud.get_ratings(db)


@app.get("/ratings/{rating_id}", response_model=schemas.Rating, tags=["ratings"])
def read_rating(ingredient_id: int, db: Session = Depends(get_db)):
    recipe = crud.get_ingredient(db, ingredient_id)
    if recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return recipe


@app.post("/ratings/", response_model=schemas.Rating, tags=["ratings"])
def create_rating(create_request: schemas.RatingCreate, db: Session = Depends(get_db)):
    return crud.create_rating(db, create_request)

# controllers

@app.post("/recipes/_search", response_model=schemas.RecipeSearchResponse, tags=["recipes"])
def search_recipes(request: schemas.RecipeSearchRequest, db: Session = Depends(get_db)):
    return NotImplementedError


@app.post("/products/_search", response_model=schemas.ProductSearchResponse, tags=["products"])
def search_products(request: schemas.ProductSearchRequest, db: Session = Depends(get_db)):
    return NotImplementedError
