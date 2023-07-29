import os

import time

import logging

import json

import re

from areaParser import call_Preprocess

# from Model.DB_Connect import update_dd





class FileParser:

    def __init__(self, directory, runName):

        self.directory = directory

        self.previous_files = []

        self.file_processing_statuses = []

        self.error_files = []

        # self.processed_files_file = "processed_files.json"

        # self.load_processed_files()

        self.runName = runName




    # def load_processed_files(self):

    #     """Loads the list of processed files from the JSON file."""

    #     if os.path.exists(self.processed_files_file):

    #         with open(self.processed_files_file, "r") as f:

    #             self.previous_files = json.load(f)




        # print(self.previous_files)




    # def save_processed_files(self):

    #     """Saves the list of processed files to the JSON file."""

    #     with open(self.processed_files_file, "a") as f:

    #         json.dump(self.previous_files, f)




    def setup_logging(self):

        """Sets up the logging configuration."""

        # print('logger created')

        log_file = "parser_details.log"

        logging.basicConfig(filename=log_file, level=logging.INFO,

                            format='%(asctime)s %(levelname)s: %(message)s', filemode='a')

        console_handler = logging.StreamHandler()

        console_handler.setLevel(logging.INFO)

        formatter = logging.Formatter('%(asctime)s %(levelname)s: %(message)s')

        console_handler.setFormatter(formatter)

        logging.getLogger('').addHandler(console_handler)




    def check_directory(self, directory_path, runName):

        #  """Checks the input directory and processes new files/subdirectories that exist in that directory."""

        for root, dirs, files in os.walk(directory_path):

            for file in files:

                val = re.search(r'.*area.*\.txt', file)

                if val:

                    file_path = os.path.join(root, file)

                    logging.info(f"{time.ctime()}\tFile: {file}")

                    if file not in self.previous_files:

                        try:

                            success = call_Preprocess(file_path, runName)

                            if success:

                                logging.info(

                                    f"Processed area file in Directory_checker.py: {file}")

                                # Mark the file as processed

                                self.previous_files.append(file)

                                self.file_processing_statuses.append(success)

                            else:

                                self.error_files.append(file_path)

                                self.file_processing_statuses.append(success)

                                logging.error(

                                    f"Error processing area file in Directory_checker.py: {file}.")

                        except Exception as e:

                            logging.error(

                                f"Error processing Area_file in Directory_checker.py: {file}. Error: {str(e)}")

        print(self.file_processing_statuses)

        print(runName)

        # if (any(self.file_processing_statuses)):

        #     update_dd(runName)

        #     return {"file_processing_statuses": self.file_processing_statuses, "error_files": self.error_files}

        # else:

        #     return {"file_processing_statuses": self.file_processing_statuses, "error_files": self.error_files}

        # Save the updated list of processed files

        # self.save_processed_files()




    def main(self):

        """The main function that runs the daemon script."""

        self.setup_logging()

        logging.info("Parser script started.")

        # logging.basicConfig(filename='daemon_script.log', level=logging.INFO, format='%(asctime)s %(levelname)s: %(message)s', filemode ='a')

        return self.check_directory(self.directory, self.runName)

        logging.info("End of Run")