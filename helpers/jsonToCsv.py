import json
import csv

with open("../static/facts.json", "r") as jsonfile:
    data = json.load(jsonfile)
    with open("../static/facts.csv", "w", newline="") as csvfile:
        fieldnames = ["alliance", "faction", "subfaction", "fact"]
        writer = csv.DictWriter(
            csvfile, fieldnames=fieldnames, dialect="excel")

        writer.writeheader()
        for faction in data:
            for fact in data[faction]:
                row = writer.writerow(
                    {
                        "alliance": faction,
                        "faction": "faction",
                        "subfaction": "subfaction",
                        "fact": fact,
                    }
                )
