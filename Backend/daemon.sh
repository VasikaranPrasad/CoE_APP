#!/bin/bash

# Check if the Python program exists
if [ ! -f "server.py" ]; then
  echo "file does not exist."
  exit 1
fi

# Set the interval to 30 minutes
interval=1800

while true; do
  # Run the Python program
    python3 server.py
    echo "runing $interval"
  # Sleep for the specified interval
  sleep $interval
done
