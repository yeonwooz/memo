from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient('localhost', 27017)
db = client.memodb

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/memo', methods=['POST'])
def post_article():
    print('posting')
    db.memos.insert_one({'title':'title 1', 'comment':'comment 1'})
    return jsonify({'result': 'success'})

if __name__ == '__main__':
    app.run('0.0.0.0', port = 5001, debug=True)

