from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship

from .database import Base


class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, index=True)
    eco_score = Column(Integer)
    picture_id = Column(Integer, index=True)

    ingredients = relationship("IngredientAmount", back_populates="recipe")

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, index=True)
    ingredient_id = Column(Integer, ForeignKey("ingredients.id"))
    picture_id = Column(Integer, index=True)
    amount = Column(Integer)

    ingredient = relationship("Ingredient", back_populates="products")


class Ingredient(Base):
    __tablename__ = "ingredients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, index=True)
    amount_unit = Column(String, index=True)
    picture_id = Column(Integer, index=True)

    products = relationship("Product", back_populates="ingredient")
    ingredient_amounts = relationship("IngredientAmount", back_populates="ingredient")


class IngredientAmount(Base):
    __tablename__ = "ingredient_amounts"


    id = Column(Integer, primary_key=True, index=True)
    ingredient_id = Column(Integer, ForeignKey("ingredients.id"))
    recipe_id = Column(Integer, ForeignKey("recipes.id"))
    amount = Column(Integer)

    recipe = relationship("Recipe", back_populates="ingredients")
    ingredient = relationship("Ingredient", back_populates="ingredient_amounts")


class Picture(Base):
    __tablename__ = "pictures"

    id = Column(Integer, primary_key=True, index=True)
    path = Column(String, index=True)


class Rating(Base):
    __tablename__ = "ratings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)
    recipe_id = Column(Integer, index=True)
    rating = Column(Float, index=True)

