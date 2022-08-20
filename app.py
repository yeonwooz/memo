from flask import Flask, render_template, jsonify, request
import requests
from pymongo import MongoClient

app = Flask(__name__)

#  TODO: replace 
# client = MongoClient('mongodb://test:test@localhost',27017)
# db = client.memodb2
client = MongoClient('localhost',27017)
db = client.memodb2


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/memo', methods=['POST'])
def post_article():
    print('posting')
    title = request.form['title']
    text = request.form['text']

    db.memos.insert_one({'title': title, 'text': text})
    response = {
        'result': 'success',
        'data' : {
            'title': title, 
            'text': text
        }
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run('0.0.0.0', port = 5001, debug=True)

