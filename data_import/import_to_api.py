import json
import requests
from uuid import uuid4


with open("./data.json", "r") as f:
    recipes = json.load(f)

ingredients = {}


def namefix(s: str) -> str:
    return s.lower().replace("-", " ")


for recipe in recipes:
    for ingredient in recipe["ingredients"]:
        ingredient["name"] = namefix(ingredient["name"])
        if not ingredient["name"] in ingredients:
            ingredients[ingredient["name"]] = ingredient

print(len(ingredients))

for ingredient in ingredients.values():
    if ingredient["image"] is not None:
        imgstream = requests.get(ingredient["image"], stream=True)
        filename = uuid4()
        if imgstream.status_code == 200:
            with open(f"./../static/{filename}.jpg", "wb") as f:
                for chunk in imgstream.iter_content(chunk_size=1024):
                    if chunk:
                        f.write(chunk)
        rimg = requests.post(
            "http://localhost:8000/pictures/from-path", json={"path": f"http://localhost:8080/static/{filename}.jpg"}
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
        imgstream = requests.get(recipe["image"], stream=True)
        filename = uuid4()
        if imgstream.status_code == 200:
            with open(f"./../static/{filename}.jpg", "wb") as f:
                for chunk in imgstream.iter_content(chunk_size=1024):
                    if chunk:
                        f.write(chunk)
        rimg = requests.post(
            "http://localhost:8000/pictures/from-path", json={"path": f"http://localhost:8080/static/{filename}.jpg"}
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
