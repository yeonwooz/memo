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

@app.route('/memo-list', methods=['GET'])
def memo_list():
    # 모든 데이터 조회
    contents = list(db.memos.find({}, {'_id': 0}))
    return jsonify({'result': 'success', 'contents': contents})

@app.route('/memo', methods=['GET', 'POST'])
def memo():
    if request.method == 'POST':
        print('posting')
        title = request.form['title']
        text = request.form['text']
        return post_content(title, text)
    else: 
        print('getting')
        return get_content()

def get_content():
    return


def post_content(title, text):
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

