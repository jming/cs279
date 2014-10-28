import pandas as pd

def main():

	vals = pd.DataFrame.from_csv('mturk_data.csv')

	print vals.head()