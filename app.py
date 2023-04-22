from flask import Flask, render_template, request, jsonify
import openai
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY")


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():
    question = request.json["question"]

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{
            "role":
            "system",
            "content":
            "Your are an assistant. Answer the given questions."
        }, {
            "role": "user",
            "content": question
        }])

    response = completion.choices[0].message.content
    return jsonify({"response": response})


if __name__ == "__main__":
    app.run(debug=True)
