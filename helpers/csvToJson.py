import json
import csv

with open('../static/facts.csv', 'r') as csvfile:
    csvData = csv.DictReader(csvfile)
    with open('../static/facts.json', 'w') as jsonfile:
        for csvRow in csvData:
            print(csvRow["fact"])
