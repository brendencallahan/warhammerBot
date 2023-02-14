from operator import itemgetter
import json
import csv


with open("../static/facts.csv", "r") as csvFile:
    csvData = csv.DictReader(csvFile)
    unsortedFacts = []
    for csvRow in csvData:
        unsortedFacts.append(csvRow)

    facts = sorted(unsortedFacts, key=itemgetter(
        "alliance", "faction", "subfaction"))

with open("../static/facts.json", "w") as jsonFile:
    json.dump(facts, jsonFile)
