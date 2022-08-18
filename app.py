from flask import Flask, render_template, jsonify, request
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/memo', methods=['POST'])
def post_article():
    print('posting')
    return jsonify({'result': 'success'})

if __name__ == '__main__':
    app.run('0.0.0.0', port = 5001, debug=True)

