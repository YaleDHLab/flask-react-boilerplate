'''server/app.py - main api app declaration'''
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS

'''Main wrapper for app creation'''
app = Flask(__name__, static_folder='../build')
CORS(app)

##
# API routes
##

@app.route('/api/items')
def items():
  '''Sample API route for data'''
  return jsonify([{'title': 'A'}, {'title': 'B'}])

##
# View route
##

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
  '''Return index.html for all non-api routes'''
  #pylint: disable=unused-argument
  return send_from_directory(app.static_folder, 'index.html')