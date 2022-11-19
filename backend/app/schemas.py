from typing import Optional, List

from pydantic import BaseModel


class RecipeBase(BaseModel):
    title: str
    description: Optional[str] = None


class RecipeCreate(RecipeBase):
    pass


class Recipe(RecipeBase):
    id: int

    class Config:
        orm_mode = True


class ProductBase(BaseModel):
    title: str
    description: Optional[str] = None


class ProductCreate(ProductBase):
    pass


class Product(ProductBase):
    id: int

    class Config:
        orm_mode = True


class IngredientBase(BaseModel):
    title: str
    description: Optional[str] = None


class IngredientCreate(ProductBase):
    pass


class Ingredient(ProductBase):
    id: int

    class Config:
        orm_mode = True


class IngredientAmount(BaseModel):
    id: int
    amount: int


class ProductSearchRequest(BaseModel):
    ingredients: List[IngredientAmount]


class ProductSearchResponse(BaseModel):
    products: List[Product]


class RecipeSearchRequest(BaseModel):
    ingredients: List[IngredientAmount]


class RecipeSearchResponse(BaseModel):
    recipes: List[Recipe]
