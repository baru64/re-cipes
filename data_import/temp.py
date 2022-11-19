import json
import pandas as pd

def get_eco_recommendation(my_cart: list, recipes):
    """
    Gets my_cart e.g. ['chicken', 'dried oregano']
    and returns Datframe with column recipe_name and points
    example row: Chicken Vesuvio 2
    """
    recipes_points = []
    for x in recipes:
        points = 0
        for y in x['ingredients']:
            if(y['name'] in my_cart):
                points += 1
        recipes_points.append([x['name'], points])
    result = [x for x in recipes_points if x[1] > 0]
    df = pd.DataFrame(result, columns = ['recipe_name', 'points'])
    return df.sort_values('points', ascending=False)

my_fridge = ['chicken', 'dried oregano']
recipes_points = []

with open("data.json", "rb") as f:
    data = json.load(f)
#     for x in data:
#         points = 0
#         for y in x['ingredients']:
#             if(y['name'] in my_fridge):
#                 points += 1
#         recipes_points.append((x['name'], points))
# result = [x for x in recipes_points if x[1] > 0]
# print(result)
print(get_eco_recommendation(my_fridge, data))