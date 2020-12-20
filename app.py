# import dependencies

import os
import pandas as pd
import numpy as np
import sqlalchemy
import json
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy


# create app
app = Flask(__name__)

##### Database Setup #####
engine = create_engine("sqlite:///filmPermits.sqlite")

#app.config["SQLALCHEMY_FILM_DATABASE"] = "sqlite:///filmPermits.sqlite"
#db = SQLAlchemy(app)

# reflect existing db into new model
Base = automap_base()

# reflect tables
Base.prepare(engine, reflect=True)
# jdkfja;db

# print out table names to check
print(Base.classes.keys())

# save references to each table
Film_Permits = Base.classes.film_permits_clean
Permits_Category = Base.classes.permits_by_category
Permits_Category_Sub = Base.classes.permits_by_category_and_subcategory
Permits_Category_Year = Base.classes.permits_by_year_and_category

#### Flask Routes ####

@app.route("/")
def welcome():
    
    # list available routes
    return (
        f"Available Routes:<br/>"
        f"/api/FilmPermits<br/>"
        f"/api/PermitsCategory<br/>"
        f"/api/PermitsCategorySub<br/>"
        f"/api/PermitsCategoryYear"
    )

@app.route("/api/FilmPermits")
def FilmPermits():

    # Query the database and use pandas to read results
    session = Session(engine)
    stmt = session.query(Film_Permits).statement
    df = pd.read_sql_query(stmt, session.bind)
    session.close()

    # Convert dataframe to JSON string
    result = df.to_json(orient="records")
    parsed = json.loads(result)
    return json.dumps(parsed)  

@app.route("/api/PermitsCategory")
def PermitsCategory():

    # Query the database and use pandas to read results
    session = Session(engine)
    stmt = session.query(Permits_Category).statement
    df = pd.read_sql_query(stmt, session.bind)
    session.close()

    # Convert dataframe to JSON string
    result = df.to_json(orient="records")
    parsed = json.loads(result)
    return json.dumps(parsed)

@app.route("/api/PermitsCategorySub")
def PermitsCategorySub():

    # Query the database and use pandas to read results
    session = Session(engine)
    stmt = session.query(Permits_Category_Sub).statement
    df = pd.read_sql_query(stmt, session.bind)
    session.close()

    # Convert dataframe to JSON string
    result = df.to_json(orient="records")
    parsed = json.loads(result)
    return json.dumps(parsed)

@app.route("/api/PermitsCategoryYear")
def PermitsCategoryYear():

    # Query the database and use pandas to read results
    session = Session(engine)
    stmt = session.query(Permits_Category_Sub).statement
    df = pd.read_sql_query(stmt, session.bind)
    session.close()

    # Convert dataframe to JSON string
    result = df.to_json(orient="records")
    parsed = json.loads(result)
    return json.dumps(parsed)

if __name__ == '__main__':
    app.run(debug=True)
