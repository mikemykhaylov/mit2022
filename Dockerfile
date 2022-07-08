# Use the official Python image.
# https://hub.docker.com/_/python
FROM python:3.10-alpine

RUN apk update

# Install Chrome
RUN apk add git
RUN apk add chromium
RUN apk add chromium-chromedriver

# Install Python dependencies.
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Copy local code to the container image.
ENV APP_HOME /scraper
WORKDIR $APP_HOME
COPY ./scraper .

# Run the web service on container startup. Here we use the gunicorn
# webserver, with one worker process and 8 threads.
# For environments with multiple CPU cores, increase the number of workers
# to be equal to the cores available.
CMD [ "python", "/scraper/index.py" ]