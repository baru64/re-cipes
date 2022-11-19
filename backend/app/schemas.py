from typing import Optional, List, Any

from pydantic import BaseModel


class BaseIngredientAmount(BaseModel):
    ingredient_id: int
    amount: int


class CreateIngredientAmount(BaseIngredientAmount):
    recipe_id: int


class IngredientAmount(BaseIngredientAmount):
    id: int
    recipe_id: int

    class Config:
        orm_mode = True


class RecipeBase(BaseModel):
    name: str
    description: Optional[str] = None
    picture_id: Optional[int]
    eco_score: Optional[int]
    ingredients: List[BaseIngredientAmount]


class RecipeResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    picture_id: Optional[int]
    eco_score: Optional[int]
    ingredients: List[Any]

    class Config:
        orm_mode = True


class IngredientInfo(BaseModel):
    image: Optional[str]
    name: str
    amount: int
    unit: str


class RecipeExtended(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    steps: Optional[List[str]] = None
    image: Optional[str]
    eco_score: Optional[int]
    ingredients: List[IngredientInfo]


class RecipeCreate(RecipeBase):
    pass

class Recipe(RecipeBase):
    id: int
    picture: Optional[str]

    class Config:
        orm_mode = True


class IngredientBase(BaseModel):
    name: str
    description: Optional[str] = None
    amount_unit: str
    picture_id: Optional[int]


class IngredientCreate(IngredientBase):
    pass


class Ingredient(IngredientBase):
    id: int
    picture: Optional[str]

    class Config:
        orm_mode = True


class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    ingredient_id: int
    picture_id: Optional[int]
    amount: int


class ProductCreate(ProductBase):
    pass


class Product(ProductBase):
    id: int
    picture: Optional[str]

    class Config:
        orm_mode = True


class ProductSearchRequest(BaseModel):
    ingredients: List[BaseIngredientAmount]


class ProductSearchResponse(BaseModel):
    products: List[Product]


class RecipeSearchRequest(BaseModel):
    ingredients: List[BaseIngredientAmount]


class RecipeSearchResponse(BaseModel):
    recipes: List[Recipe]


class PictureBase(BaseModel):
    path: str


class Picture(PictureBase):
    id: int

    class Config:
        orm_mode = True

class PictureUpload(BaseModel):
    img: bytes


class PictureCreate(PictureBase):
    pass
