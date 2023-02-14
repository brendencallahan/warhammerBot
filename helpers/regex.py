import re as reg
import os
import click as cli


def main():
    # Read file into single string
    try:
        with open("../static/40k facts.txt", "r") as fin:
            facts = fin.read()
    except OSError:
        print("Could not find '40k facts.txt'. Make sure it's in '../static/'")
        return

    if facts:
        # Make array of facts
        facts = reg.split("\\*", facts)
        facts.pop(0)

        for i in range(len(facts)):
            # Remove whitespace
            facts[i] = facts[i].strip()

            # Select all faction names
            if facts[i].endswith(":"):
                # Delete comma from every entry that is before a faction
                if i != 0:
                    facts[i - 1] = f"{facts[i - 1][:-3]}\n],\n\n"

                # Canonize the faction names for JSON format
                facts[
                    i
                ] = f'"{facts[i].lower().replace(":", "").partition(" ")[0]}":[\n'

            # Format all entries that aren't faction names.
            else:
                facts[i] = f'\t"{facts[i].strip()}",\n'

        # Wrap the entire thing in curly braces {
        facts[0] = "{" + facts[0]
        # } and remove trailing comma from last entry
        facts[-1] = facts[-1][:-3] + "\n]}"

        # Check for existing facts.json file
        if os.path.isfile("../static/facts.json"):
            # Replace facts.json, if user confirms, otherwise exit
            if cli.confirm("facts.JSON exists. Replace?", default=True):
                print("Replacing facts.json...")
                with open("../static/facts.json", "w") as f:
                    f.writelines(facts)
                print("Success")
                return
            else:
                print('Exiting job...\n Exited: "facts.JSON already exists"')
                return

        # If facts.json doesn't exist create it and write facts to it
        else:
            with open("../static/facts.json", "w") as f:
                f.writelines(facts)
                print("Creating facts.json...\n Success")
                return


if __name__ == "__main__":
    main()
