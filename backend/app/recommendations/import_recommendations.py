import requests

with open("./data/ratingswithrecomms_userid1.csv", "r") as f:
    lines = f.readlines()

for line in lines[1:]:
    s = line.split("\t")
    data = {
        "user_id": int(s[0]),
        "recipe_id": int(s[1]),
        "rating": float(s[2])
    }
    r = requests.post("http://localhost:8000/ratings/", json=data)
    print(r, r.content)
