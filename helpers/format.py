import re
import json

with open('40k facts.txt', 'r') as f:
    txt = f.read()

test = '"this is "a" test"'

if txt:
    txt = re.split("\*", txt)
    for i in range(len(txt)):
        #print(test.replace('"', ''))
        # print(txt[i])
        txt[i] = f'\t"{txt[i].strip()}",\n\n'
    with open('facts.json', 'w') as f:
        f.writelines(txt)

else:
    print("Didn't work")
