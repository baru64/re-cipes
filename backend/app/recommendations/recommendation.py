import numpy as np
import pandas as pd
from surprise import Dataset
from surprise import Reader
from surprise import KNNWithMeans

# column_names = ['user_id', 'item_id', 'rating', 'timestamp']
# df = pd.read_csv('data/u.data', sep='\t', names=column_names)
# # print(df.head())
# # print(f"Shape df:{df.shape[0]}")

# # print(np.unique(df['user_id'].to_numpy()))

# df2 = df.loc[df['user_id']<10]
# # print(f"Shape df2:{df2.shape[0]}")

# df3 = df2.loc[df2['item_id']<100]
# # print(f"Shape df3:{df3.shape[0]}")
# # print(df3)
# df3.to_csv(index=None, sep='\t', path_or_buf='data/ratings10users100items.csv')

column_names = ['user_id', 'item_id', 'rating', 'timestamp']

#functions

# statistics

def get_recommender_model(df: pd.DataFrame) -> KNNWithMeans:
    
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

def get_n_best_rated_items_for_user(df: pd.DataFrame, n: int, user_id: int, model: KNNWithMeans) -> pd.Series:
    """
    Returns pd.Series with n best rated items (item_id, rating) for specific user_id (including predicted ratings).
    """
    df_specific_user_id = df.loc[df['user_id']==user_id]
    
    column_names = ['user_id', 'item_id', 'rating', 'timestamp']
    
    for x in range(222):
        
        if(not(x in df_specific_user_id['item_id'])):
            prediction = round(model.predict(user_id,x).est, 2)
            # print(prediction.est)
            dftemp = pd.DataFrame([[user_id,x,prediction, 1]], columns = column_names)
            df_specific_user_id = pd.concat([df_specific_user_id, dftemp])
            # df_specific_user_id.append(dftemp, ignore_index=True)
            
    return df_specific_user_id
    
    
    
    # prediction = model.predict(user_id,33)
    # return df.groupby('item_id')['rating'].mean().sort_values(ascending=False)[:n]



if __name__ == '__main__':
    df = pd.read_csv('data/ratings10users100items.csv', sep='\t')

    model = get_recommender_model(df)

    # prediction = model.predict(1,33)
    # print(prediction.est)

    df_with_recomms = get_n_best_rated_items_for_user(df, 5, 1, model)
    # df_with_recomms.to_csv(index=None, sep='\t', path_or_buf='data/ratingswithrecomms_userid1.csv')