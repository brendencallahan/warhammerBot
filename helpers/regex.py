import re as reg
import os
import click as cli

def main():
    # Read file into single string
    try:
        with open('../static/40k facts.txt', 'r') as fin:
            facts = fin.read()
    except:
        print("Could not find '40k facts.txt'. Make sure it is in '../static/'")
        return


    if facts:
        # Make array of facts
        facts = reg.split("\*", facts)
        facts.pop(0)

        for i in range(len(facts)):

            # Remove whitespace
            facts[i] = facts[i].strip()

            # Select all faction names
            if facts[i].endswith(":"):

                # Delete comma from every entry that is directly before a faction (except the first faction)
                if i != 0:
                    facts[i - 1] = f'{facts[i - 1][:-3]}\n],\n\n'

                # Canonize the faction names for JSON format
                facts[i] = f'"{facts[i].lower().replace(":", "").partition(" ")[0]}":[\n'

            # Format all entries that aren't faction names. Removing whitespace, adding quotation marks and a comma
            else:
                facts[i] = f'\t"{facts[i].strip()}",\n\n'


        # Wrap the entire thing in curly braces {
        facts[0] = "{" + facts[0]
        # } and remove trailing comma from last entry
        facts[-1] = facts[-1][:-3] + "\n]}"

        # Check for existing facts.json file
        if os.path.isfile('../static/facts.json'):

            # Replace facts.json, if user confirms, otherwise exit
            if cli.confirm('facts.JSON exists. Replace?', default=True):
                print('Replacing facts.json...')
                with open('../static/facts.json', 'w') as f:
                    f.writelines(facts)
                print('Success')
                return
            else:
                print(f'Exiting job...\n Exited: "facts.JSON already exists"')
                return

        # If facts.json doesn't exist create it and write facts to it
        else:
            with open('../static/facts.json', 'w') as f:
                f.writelines(facts)
                print(f'Creating facts.json...\n Success')
                return


if __name__ == "__main__":
    main()