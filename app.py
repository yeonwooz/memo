from flask import Flask, render_template, jsonify, request
import pymongo
import json
from bson import ObjectId

app = Flask(__name__)

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

# client = pymongo.MongoClient('mongodb://test:test@localhost',27017)
# db = client.memodb2
client = pymongo.MongoClient('localhost',27017)
db = client.memodb2

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/memo-list', methods=['GET'])
def memo_list():
    # 모든 데이터 조회
    contents = list(db.memos.find())
    encodedData = JSONEncoder().encode(contents)
    return jsonify({'result': 'success', 'contents': encodedData})

@app.route('/memo', methods=['GET', 'POST', 'DELETE'])
def memo():
    if request.method == 'POST':
        title = request.form['title']
        text = request.form['text']
        return post_content(title, text)
    else:
        return get_content()

def post_content(title, text):
    db.memos.insert_one({'title': title, 'text': text})
    # TODO: last document's id
    # lastcontent = list(db.memos.find().sort({'_id':-1}).limit(1))
    # lastcontent = list(db.memos.find().sort({"_id":-1}).limit(1))
    # print(lastcontent)
    # content = list(db.memos.find())
    # db.collectionName.findOne({}, {sort:{$natural:-1}})
    response = {
        'result': 'success',
        'data' : {
            'title': title, 
            'text': text
        }
    }
    return jsonify(response)

def get_content():
    return

@app.route('/patch-memo', methods=['POST'])
def patch():
    id = request.form['id']
    title = request.form['title']
    text = request.form['text']
    print(id)
    db.memos.update_one({'_id':  ObjectId(id)}, {'$set' : {'title': title, 'text': text}})

    response = {
        'result': 'success',
        'data' : {
            'title': title, 
            'text': text
        }
    }
    return jsonify(response)

@app.route('/delete-memo', methods=['POST'])
def delete():
        id = request.form['id']
        return delete_content(ObjectId(id))

def delete_content(id):
    db.memos.delete_one({'_id': ObjectId(id)})
    return jsonify({'result': 'delete success'})

if __name__ == '__main__':
    app.run('0.0.0.0', port = 5001, debug=True)

