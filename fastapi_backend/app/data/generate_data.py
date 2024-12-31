import polars as pl
import random
import datetime as dt
from faker import Faker

# Initialize Faker
fake = Faker()

# Define possible values for columns
tools = ["Information Page", "Home Page", "Login Page", "Store", "Booking Page", "Support Page"]
ratings = [1, 2, 3, 4, 5]
nps_ratings = list(range(11))
multiple_choice_answers = ["Option A", "Option B", "Option C", "Option D", "Option E"]

# Generate fake data
data = {
    "Tool": [random.choice(tools) for _ in range(100)],
    "Date": [
        fake.date_between_dates(
            date_start=dt.date(2024,1,1),
            date_end=dt.date(2024,12,31)
        ) for _ in range(100)
    ],
    "Rating": [random.choice(ratings) for _ in range(100)],
    "NPS_Rating": [random.choice(nps_ratings) for _ in range(100)],
    "Multiple_Choice_Answer": [random.choice(multiple_choice_answers) for _ in range(100)],
}

# Create Polars DataFrame
pl.DataFrame(data).write_csv("data.csv")

