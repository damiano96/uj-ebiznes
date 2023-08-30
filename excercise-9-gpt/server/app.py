from flask import Flask, request, jsonify
from ChatGPT import ChatGPT
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
chat_api = ChatGPT()


@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    messages = data['messages']
    response = chat_api.generate_response(messages)
    return jsonify({'response': response})


if __name__ == '__main__':
    app.run()
