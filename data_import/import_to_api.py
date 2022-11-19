import json
import requests


with open("./data.json", "r") as f:
    recipes = json.load(f)

ingredients = {}

for recipe in recipes:
    for ingredient in recipe["ingredients"]:
        if not ingredient["name"] in ingredients:
            ingredients[ingredient["name"]] = ingredient

for ingredient in ingredients.values():
    data={
       "name": ingredient["name"],
       "description": "",
       "amount_unit": ingredient["unit"],
    }
    r = requests.post(
        "http://localhost:8000/ingredients/", json=data
    )
    print(r, r.content, r.request.body)
    rjson = r.json()
    ingredient["id"] = rjson["id"]

for recipe in recipes:
    recipe_ingredients = []
    for i in recipe["ingredients"]:
        ingr = {
            "amount": int(i["quantity"]),
            "ingredient_id": ingredients[i["name"]]["id"]
        }
        recipe_ingredients.append(ingr)
    data = {
      "name": recipe["name"],
      "description": "\n".join(recipe["steps"]),
      "ingredients": recipe_ingredients
    }
    r = requests.post("http://localhost:8000/recipes/", json=data)
    print(r, r.content, r.request.body)
