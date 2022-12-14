import numpy as np
import pandas as pd
from surprise import Dataset
from surprise import Reader
from surprise import KNNWithMeans

import requests


def get_recommender_model(df: pd.DataFrame) -> KNNWithMeans:
    """
    Returns recommender based on user ratings.
    """

    reader = Reader(rating_scale=(1, 5))
    data = Dataset.load_from_df(df[["user_id", "item_id", "rating"]], reader)

    # To use item-based cosine similarity
    sim_options = {
        "name": "cosine",
        "user_based": True,  # Compute  similarities between users
    }
    algo = KNNWithMeans(sim_options=sim_options)

    trainingSet = data.build_full_trainset()

    return algo.fit(trainingSet)


def get_n_best_rated_items(df: pd.DataFrame, n: int) -> pd.Series:
    """
    Returns pd.Series with n best rated items (item_id, rating) (average for all users).
    """
    return df.groupby("item_id")["rating"].mean().sort_values(ascending=False)[:n]


def get_n_best_rated_items_for_user(
    df: pd.DataFrame, user_id: int, model: KNNWithMeans
) -> pd.DataFrame:
    """
    Returns pd.Dataframe with created missing ratings using recommendation engine
    """
    df_step = df.loc[df["user_id"] == user_id]
    df_specific_user_id = df_step.drop_duplicates("user_id")

    column_names = ["user_id", "item_id", "rating", "timestamp"]

    for x in range(222):

        if not (x in df_specific_user_id["item_id"]):
            prediction = round(model.predict(user_id, x).est, 2)
            # print(prediction.est)
            dftemp = pd.DataFrame([[user_id, x, prediction, 1]], columns=column_names)
            df_specific_user_id = pd.concat([df_specific_user_id, dftemp])

    return df_specific_user_id


def get_recipe_content_count(my_cart: list, recipes) -> pd.DataFrame:
    """
    Gets my_cart e.g. ['chicken', 'dried oregano']
    and returns Datframe with column recipe_name and points
    example row: Chicken Vesuvio 2
    """
    recipes_points = []
    for x in recipes:
        points = 0
        for y in x["ingredients"]:
            if y["ingredient_id"] in my_cart:
                points += 1
        recipes_points.append([x["id"], points])
    result = [x for x in recipes_points if x[1] > 0]
    df = pd.DataFrame(result, columns=["recipe_id", "points"])
    return df.sort_values("points", ascending=False)


def get_search(cart):
    """
    Gets loaded json with ingredients.
    Return Dataframe sorted by ecopoints and user ratings
    """
    products_to_use = [x["ingredient_id"] for x in cart["ingredients"]]
    # recipe contents
    recipe_content_response = requests.get("http://127.0.0.1:80/recipes/")
    if recipe_content_response.status_code == 200:
        print("The request was a success!")
        # Code here will only run if the request is successful
        recipe_points_df = get_recipe_content_count(
            products_to_use, recipe_content_response.json()
        )
    elif recipe_content_response.status_code == 404:
        print("Result not found!")

    # print(recipe_points_df.shape[0])
    ratings_recipes_response = requests.get("http://localhost:80/ratings/")
    if ratings_recipes_response.status_code == 200:
        print("The request was a success!")
        # Code here will only run if the request is successful
        # ratings_recipes_df = get_ratings_for_recipes()
        ratings = []
        rrr = ratings_recipes_response.json()
        recipe_ids = recipe_points_df["recipe_id"]
        for x in recipe_ids:
            for y in rrr:
                if x == y["recipe_id"]:  # recipe_id
                    ratings.append(y["rating"])
        # print(f"Ratings:{ratings}")
        # print(len(ratings))
        recipe_points_df["rating"] = ratings
        # print(recipe_points_df)
        sorted_df = recipe_points_df.sort_values(
            by=["points", "rating"], ascending=[False, False]
        )
        return sorted_df
    elif ratings_recipes_response.status_code == 404:
        print("Result not found!")


def get_n_best_recipes_dict(df: pd.DataFrame, n_best: int):
    df_head = df.head(n_best)
    result = [
        {"id": key + 1, "recipe_id": value}
        for (key, value) in enumerate(df_head["recipe_id"])
    ]
    return result


if __name__ == "__main__":

    # _search
    # mock response from frontend - ingredients which id like to use
    example_cart = {
        "ingredients": [
            {"ingredient_id": 4, "amount": 100},  # chicken
            {"ingredient_id": 16, "amount": 100},  # onion
        ]
    }
    search_result = get_search(example_cart)
    get_n_best_recipes_dict(search_result, 9)
