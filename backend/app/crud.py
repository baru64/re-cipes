from sqlalchemy.orm import Session

from . import models, schemas
from .recommendations import recommendation


def get_recipes(db: Session):
    recipes_db = db.query(models.Recipe).all()
    recipes = [schemas.RecipeResponse.from_orm(r) for r in recipes_db]
    for recipe in recipes:
        if recipe.picture_id is not None:
            pic_db = db.query(models.Picture).filter(models.Picture.id == recipe.picture_id).first()
            if pic_db is not None:
                pic = schemas.Picture.from_orm(pic_db)
                recipe.picture = pic.path
    return recipes


def get_recipe(db: Session, recipe_id: int):
    recipe_db = db.query(models.Recipe).filter(models.Recipe.id == recipe_id).first()
    recipe = schemas.RecipeResponse.from_orm(recipe_db)
    if recipe.picture_id is not None:
        pic_db = db.query(models.Picture).filter(models.Picture.id == recipe.picture_id).first()
        if pic_db is not None:
            pic = schemas.Picture.from_orm(pic_db)
            recipe.picture = pic.path
    return recipe



def create_recipe(db: Session, recipe: schemas.RecipeCreate):
    r = recipe.dict()
    ingredients = r.pop("ingredients")
    new_recipe = models.Recipe(**r)
    db.add(new_recipe)
    db.commit()
    db.refresh(new_recipe)
    nr_obj = schemas.Recipe.from_orm(new_recipe)
    for ia in ingredients:
        create_ia = schemas.CreateIngredientAmount(
            **ia,
            recipe_id=nr_obj.id
        )
        db.add(models.IngredientAmount(**create_ia.dict()))
    db.commit()
    db.refresh(new_recipe)
    return new_recipe


def get_products(db: Session):
    products_db = db.query(models.Product).all()
    products = [schemas.Product.from_orm(r) for r in products_db]
    for product in products:
        if product.picture_id is not None:
            pic_db = db.query(models.Picture).filter(models.Picture.id == product.picture_id).first()
            if pic_db is not None:
                pic = schemas.Picture.from_orm(pic_db)
                product.picture = pic.path
    return products


def get_product(db: Session, product_id: int):
    return db.query(models.Product).filter(models.Product.id == product_id).first()


def create_product(db: Session, product: schemas.ProductCreate):
    new_product = models.Product(**product.dict())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product


def get_ingredients(db: Session):
    ingredient_db = db.query(models.Ingredient).all()
    ingredients = [schemas.Ingredient.from_orm(r) for r in ingredient_db]
    for ingredient in ingredients:
        if ingredient.picture_id is not None:
            pic_db = db.query(models.Picture).filter(models.Picture.id == ingredient.picture_id).first()
            if pic_db is not None:
                pic = schemas.Picture.from_orm(pic_db)
                ingredient.picture = pic.path
    return ingredients


def get_ingredient(db: Session, ingredient_id: int):
    return db.query(models.Ingredient).filter(models.Ingredient.id == ingredient_id).first()


def create_ingredient(db: Session, ingredient: schemas.IngredientCreate):
    new_ingredient = models.Ingredient(**ingredient.dict())
    db.add(new_ingredient)
    db.commit()
    db.refresh(new_ingredient)
    return new_ingredient


def create_picture(db: Session, picture: schemas.PictureCreate):
    new_picture = models.Picture(**picture.dict())
    db.add(new_picture)
    db.commit()
    db.refresh(new_picture)
    return new_picture


def get_picture(db: Session, picture_id: int):
    return db.query(models.Picture).filter(models.Picture.id == picture_id).first()


def get_ratings(db: Session):
    return db.query(models.Rating).all()


def get_rating(db: Session, rating_id: int):
    return db.query(models.Rating).filter(models.Rating.id == rating_id).first()


def create_rating(db: Session, rating: schemas.RatingCreate):
    new_rating = models.Rating(**rating.dict())
    db.add(new_rating)
    db.commit()
    db.refresh(new_rating)
    return new_rating


def delete_all_ratings(db: Session):
    try:
        db.query(models.Rating).delete()
        db.commit()
    except:
        db.rollback()


def get_recipe_search(db: Session, cart: schemas.RecipeSearchRequest, n: int = 9):
    print("cart: ", cart.dict())
    search_result = recommendation.get_search(cart.dict())
    if search_result is not None:
        top_recipes = recommendation.get_n_best_recipes_dict(search_result, n)
    else:
        top_recipes = []
    print(top_recipes)
    recipes = {}
    idx = 1
    for r in top_recipes:
        recipe = get_recipe(db, r["recipe_id"])
        recipes[idx] = recipe
        idx += 1
    return recipes
