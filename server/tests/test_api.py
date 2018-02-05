'''API test suite'''
import sys, os, json
sys.path.insert(0, 'server')
sys.path.insert(0, '..')
sys.path.insert(0, '.')

# import the Flask module
from app import app

# indicate tests are running
app.testing = True

# generate a test client
app = app.test_client()

def test_api_data():
  data = app.get('/api/items').get_data(as_text=True)
  assert('title' in json.loads(data)[0])

def test_index_response():
  response = app.get('/')
  assert(response.status_code == 200)