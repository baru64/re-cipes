import numpy as np
import pandas as pd
from surprise import Dataset
from surprise import Reader
from surprise import KNNWithMeans


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
    return df.groupby('item_id')['rating'].mean().sort_values(ascending=False)[:n]

def get_n_best_rated_items_for_user(df: pd.DataFrame, n: int, user_id: int, model: KNNWithMeans) -> pd.DataFrame:
    """
    Returns pd.Series with n best rated items (item_id, rating) for specific user_id (including predicted ratings).
    """
    df_step = df.loc[df['user_id']==user_id]
    df_specific_user_id = df_step.drop_duplicates('user_id')
    
    column_names = ['user_id', 'item_id', 'rating', 'timestamp']
    
    for x in range(222):
        
        if(not(x in df_specific_user_id['item_id'])):
            prediction = round(model.predict(user_id,x).est, 2)
            # print(prediction.est)
            dftemp = pd.DataFrame([[user_id,x,prediction, 1]], columns = column_names)
            df_specific_user_id = pd.concat([df_specific_user_id, dftemp])
            
    return df_specific_user_id
<<<<<<< HEAD

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
=======
>>>>>>> main

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
    
if __name__ == '__main__':
    # df = pd.read_csv('data/ratings10users100items.csv', sep='\t')
<<<<<<< HEAD

    # model = get_recommender_model(df)
    
    # df_with_recomms = get_n_best_rated_items_for_user(df, 5, 1, model)
    # df_with_recomms.to_csv(index=None, sep='\t', path_or_buf='data/ratingswithrecomms_userid1.csv')
    
    df = pd.read_csv('data/ratingswithrecomms_userid1.csv', sep='\t')
    # df2 = df.loc[df['item_id']!=0]
    
    
=======

    # model = get_recommender_model(df)


    # df_with_recomms = get_n_best_rated_items_for_user(df, 5, 1, model)
    # print(df_with_recomms)
    
    # df2 = df_with_recomms.loc[df_with_recomms['item_id']!=0]
    # df3 = df2.loc[df2['item_id']<181].sort_values('item_id')
    # print(df3)
    
    # df3.to_csv(index=None, sep='\t', path_or_buf='data/ratingswithrecomms_userid1.csv')
    
    df = pd.read_csv('data/ratingswithrecomms_userid1.csv', sep='\t')
    print(df)
>>>>>>> main
