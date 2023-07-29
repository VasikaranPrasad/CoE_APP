from pymongo import MongoClient

import json

import uuid

import urllib.parse

import logging

import os

from bson import ObjectId


mongo_url = f"mongodb+srv://DesignAudit:DesignAudit@designaudit.161n4ok.mongodb.net/?retryWrites=true&w=majority"


# Connect to MongoDB

client = MongoClient(mongo_url)


# Access the database

db = client.get_database('COE_PARSER')

# Access the collection

collection = db['area_reports']


# **** DA database ******

da = client.get_database("test")

da_collection = da['runs']


# Close the MongoDB connection

logging.basicConfig(filename='daemon_script.log', level=logging.INFO,

                    format='%(asctime)s %(levelname)s: %(message)s', filemode='a')


def push_to_database(result, run_name):

    folder_name = "run_files"

    if not os.path.exists(folder_name):

        os.makedirs(folder_name)

    try:

        filename = f"{folder_name}/{run_name}_{str(uuid.uuid4())}.json"

        logging.info("Parsing function called and pushed to MongoDB")

        # print(result)

        with open(filename, "w") as file:

            json.dump(result, file, indent=4)

        val = {"runName": run_name, "file_name": filename}

        result = collection.insert_one(val)

        return result

    except Exception as e:

        logging.ERROR("Error pushing data to DB")

        return False


def collect_data():

    data = list(collection.find())

    return data


def get_file_data(runName):

    document = collection.find({'runName': runName})

    return list(document)


# ****** DA Controller ********


def check_run_name_exists(runName):

    try:

        result = da_collection.find_one({"runName": runName})

        if result is not None:

            return True

        else:

            # If the 'runName' value doesn't exist, return True

            return False

    except Exception as e:

        # Handle any errors (e.g., connection issues, query failures)

        print("Error while checking runName existence:", e)

        return False


def file_read_exists(runId):

    try:

        object_id = ObjectId(runId)

        result = collection.find_one({"_id": object_id})

        print(result)

        if result is not None:

            return result

        else:

            # If the 'runName' value doesn't exist, return True

            return False

    except Exception as e:

        # Handle any errors (e.g., connection issues, query failures)

        print("Error while checking runName existence:", e)

        return False


# def update_dd(runName):

#     return False

    # print("update func",runName)

    # update_result = da_collection.update_one({"runName": runName}, {"$set": {"dd": True}})

    # matched_count = update_result.matched_count

    # return matched_count > 0
