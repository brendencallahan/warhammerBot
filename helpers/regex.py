import re as reg

# Read file into single string
try:
    with open('40k facts.txt', 'r') as fin:
        facts = fin.read()
except:
    print("Unable to open file. Ensure it is in this directory and named '40k facts.txt'")



# Compile the regular expressions
regFactions = reg.compile(r"(?=\*).*(?=:\n)")

factions = []

res = regFactions.findall(facts)



if facts:
    facts = reg.split("\*", facts)
    facts.pop(0)

    for i in range(len(facts)):
        #print(test.replace('"', ''))
        # print(facts[i])


        facts[i] = facts[i].strip()
        if facts[i].endswith(":"):
            if i != 0:
                facts[i - 1] = f'{facts[i - 1][:-3]}\n],\n\n'
            facts[i] = f'"{facts[i].lower().replace(":", "").partition(" ")[0]}":[\n'


        else:
            facts[i] = f'\t"{facts[i].strip()}",\n\n'


    facts[0] = "{" + facts[0]
    facts[-1] = facts[-1][:-3] + "\n]\n}"


    with open('facts.json', 'w') as f:
        f.writelines(facts)