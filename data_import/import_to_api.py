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
    if ingredient["image"] is not None:
        rimg = requests.post(
            "http://localhost:8000/pictures/from-path", json={"path": ingredient["image"]}
        )
        print(rimg, rimg.content)
        rimgjson = rimg.json()
        data = {
            "name": ingredient["name"],
            "description": "",
            "amount_unit": ingredient["unit"],
            "picture_id": rimgjson["id"],
        }
    else:
        data = {
            "name": ingredient["name"],
            "description": "",
            "amount_unit": ingredient["unit"]
        }
    r = requests.post("http://localhost:8000/ingredients/", json=data)
    print(r, r.content, r.request.body)
    rjson = r.json()
    ingredient["id"] = rjson["id"]

for recipe in recipes:
    rimgjson = {}
    if recipe["image"] is not None:
        rimg = requests.post(
            "http://localhost:8000/pictures/from-path", json={"path": recipe["image"]}
        )
        print(rimg, rimg.content)
        rimgjson = rimg.json()
    recipe_ingredients = []
    for i in recipe["ingredients"]:
        ingr = {
            "amount": int(i["quantity"]),
            "ingredient_id": ingredients[i["name"]]["id"],
        }
        recipe_ingredients.append(ingr)
    if recipe["image"] is not None:
        data = {
            "name": recipe["name"],
            "description": "\n".join(recipe["steps"]),
            "ingredients": recipe_ingredients,
            "picture_id": rimgjson["id"],
        }
    else:
        data = {
            "name": recipe["name"],
            "description": "\n".join(recipe["steps"]),
            "ingredients": recipe_ingredients
        }
    r = requests.post("http://localhost:8000/recipes/", json=data)
    print(r, r.content)
