import re

import json

import logging

from Model.DB_Connect import push_to_database





def parse_data(filename, index, subset, runName):

    print(filename, index, subset, runName)

    logging.basicConfig(filename='parser_details.log', level=logging.INFO,

                        format='%(asctime)s %(levelname)s: %(message)s', filemode='a')

    stack = []

    result = []




    try:

        with open(filename, 'r') as file:

            lines = file.readlines()[11:]




            for line in lines:

                match = re.match(r'^(\s+)(\w.*\d.*|\w.*)', line)




                if match:

                    indentation = match.group(1)

                    level = len(indentation) // 2

                    elements = match.group(2).split()




                    while len(stack) >= level:

                        stack.pop()




                    node = {col: elements[index[i]] for i, col in enumerate(

                        subset) if i in index and len(elements) > index[i]}

                    node["Sublevel"] = []

                    if stack:

                        current_level = stack[-1]

                        current_level['Sublevel'].append(node)

                    else:

                        result.append(node)




                    stack.append(node)

            logging.info(f"processed file: {filename}")




        res = push_to_database(result, runName)

        return res.acknowledged

    except Exception as e:

        logging.error(f"An error occurred: {str(e)}")

        return False




# with open(filename, 'r') as file:

#     lines = file.readlines()[11:]




#     for line in lines:

#         match = re.match(r'^(\s+)(\w.*\d.*|\w.*)', line)




#         if match:

#             indentation = match.group(1)

#             level = len(indentation) // 2

#             elements = match.group(2).split()




#             while len(stack) >= level:

#                 stack.pop()




#             node = {col: elements[index[i]] for i, col in enumerate(

#                 subset) if i in index and len(elements) > index[i]}

#             node["Sublevel"] = []

#             if stack:

#                 current_level = stack[-1]

#                 current_level['Sublevel'].append(node)

#             else:




#                 result.append(node)




#             stack.append(node)

#     logging.info(f"processed are file: {file}")

# res = push_to_database(result, runName)

# return res





def call_Preprocess(file_name, runName):

    logging.basicConfig(filename='parser_details.log', level=logging.INFO,

                        format='%(asctime)s %(levelname)s: %(message)s', filemode='a')




    with open(file_name, 'r') as file:

        lines = file.readlines()

        logging.info(f"Reading the file {file_name}")

        for line in lines:

            if re.match(r'^\s*Instance.*$', line):

                matching_line = line.strip()

                split_line = re.split(r'\s{2,}', matching_line)

                break




    data = [column.replace(' ', '_') for column in split_line]

    subset = ['Instance', 'Module', 'Cell_Count',

              'Cell_Area', 'Net_Area', 'Total_Area']




    positions = [data.index(column) for column in subset]

    logging.info(f"processed are file: {file}")

    return parse_data(file_name, positions, subset, runName)