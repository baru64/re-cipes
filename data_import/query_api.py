import configparser

import requests
import json


class Ingredient(object):
    def __init__(self, ingredient_json):
        self.name = ingredient_json['food']
        self.quantity, self.unit = mapToBaseUnits(ingredient_json['quantity'], ingredient_json['measure'])
        self.image = ingredient_json['image']


def mapToBaseUnits(quantity, measure):
    match measure:
        case "cup":
            return quantity * 237, "ml"
        case "teaspoon":
            return quantity * 4.2, "g"
        case "tablespoon":
            return quantity * 14.3, "g"
        case "pound":
            return quantity * 453, "g"
        case "head":
            return quantity, "piece"
        case "know":
            return quantity * 17.5, "g"
        case None:
            return quantity, "piece"
        case "ounce":
            return quantity * 28.3495, "g"
        case "leaf":
            return quantity, "piece"
        case "<unit>":
            return quantity, "piece"
        case "milliliter":
            return quantity, "ml"
        case "gram":
            return quantity, "g"
        case "scoop":
            return quantity * 46, "g"
        case "pint":
            return quantity * 568, "ml"
        case "gallon":
            return quantity * 4544, "ml"
        case "onion":
            return quantity, "piece"
        case "clove":
            return quantity, "piece"
        case "half":
            return quantity * 0.5, "piece"
        case "kilogram":
            return quantity * 1000, "g"
        case _:
            return quantity, "piece"


class Recipe(object):
    def __init__(self, recip_json):
        self.ingredients = []
        self.steps = []
        self.name = recip_json['label']
        self.image = recip_json['image']
        for step in recip_json['ingredientLines']:
            self.steps.append(step)
        for ing in recip_json['ingredients']:
            self.ingredients.append(Ingredient(ing))

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)



# GET /api/recipes/v2
# https://api.edamam.com/api/recipes/v2
def get_recipes(key_words):
    config = configparser.ConfigParser()
    config.read('config.ini')
    with open("data_import/data.json", "a") as datafile:
        datafile.write("[")
        for key_word in key_words:
            response = requests.get("https://api.edamam.com/api/recipes/v2", params={
                "type": "public",
                "q": key_word,
                "app_id": config['default']['app_id'],  # os.getenv('EDAMAM_APP_ID'),
                "app_key": config['default']['api_key'],  # os.getenv('EDAMAM_API_KEY'),
            })
            if response.status_code == 200:
                print("success", response.status_code)
                resp_json = response.json()
                # print(resp_json)
                recipes = []
                for hit in resp_json['hits']:
                    recipes.append(hit['recipe'])
                for recipe in recipes:
                    r = Recipe(recipe)
                    datafile.write(r.toJson() + ",\n")
            else:
                print("failed")
        datafile.write("]")


if __name__ == "__main__":
    get_recipes(["chicken", "tomato", "broccoli", "potato", "egg", "flour", "pasta","curry","basile"])
