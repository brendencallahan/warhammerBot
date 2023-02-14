import json
import csv


with open('../static/facts.csv', 'r') as csvFile:
    csvData = csv.DictReader(csvFile)
    facts = []
    for csvRow in csvData:
        facts.append(csvRow)

with open('../static/facts.json', 'w') as jsonFile:
    json.dump(facts, jsonFile)
