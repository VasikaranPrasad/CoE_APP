from flask import Flask, jsonify, request

import logging

from flask_cors import CORS

from Directory_checker import FileParser

from Model.DB_Connect import collect_data, get_file_data, check_run_name_exists, file_read_exists

from pymongo import MongoClient

from bson import ObjectId

import json

import os





app = Flask(__name__)

CORS(app)  # Enable CORS for all routes





# Custom JSON encoder to handle ObjectId serialization

class CustomJSONEncoder(json.JSONEncoder):

    def default(self, obj):

        if isinstance(obj, ObjectId):

            return str(obj)

        return super().default(obj)





@app.route('/api/data', methods=['POST'])

def receive_data():

    if request.method == 'POST':

        print("server level")

        data = request.json

        # Process the received data

        designName, runName, directory = data['designName'], data['runName'], data['directory']

        run_exist = check_run_name_exists(runName)

        if directory and run_exist:

            # Instantiate the DaemonScript object and call the main method

            parser = FileParser(directory, runName)

            res = parser.main()

            logging.info(

                "File parser instantiated with directory: %s", directory)

           

            return jsonify(res)

        else:

            logging.warning("Run Name already exists.")

            response = {

                'message': 'runName already exists',

            }

            return jsonify(response)





@app.route('/api/getdata', methods=['GET'])

def get_data():

    # Retrieve data from the MongoDB collection

    send_data = collect_data()

    print(send_data)

    return jsonify(send_data)





@app.route('/api/get_data_by_id/<string:runName>', methods=['POST'])

def get_data_by_id(runName):

    try:

        data = get_file_data(runName)

        if data:

            # file_name = data.get('file_name')

            json_data = json.loads(json.dumps(

                data, cls=CustomJSONEncoder))

            return jsonify(json_data)

        else:

            # If data is empty, return a message indicating no data was found

            return jsonify({"message": "No data found for the specified runName."})

    except Exception as e:

        print("Error:", e)

        return jsonify({"message": "Error occurred while fetching data."})





# Use the custom JSON encoder for Flask

app.json_encoder = CustomJSONEncoder





@app.route('/api/read_file_byId/<string:runNameId>', methods=['GET'])

def readFileById(runNameId):

    try:

        res = file_read_exists(runNameId)

        file_name = res.get('file_name')

        if os.path.isfile(file_name):

            # Read the JSON data from the file

            with open(file_name, 'r') as file:

                json_data = json.load(file)

            return jsonify(json_data)

        else:

            return jsonify({'error': 'File not found.'})




    except Exception as e:

        print(e)

        return jsonify({"error": e})





if __name__ == '__main__':
    
    app.run(debug=True)