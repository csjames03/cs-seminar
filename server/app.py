from flask import Flask, request, jsonify
import sys
import psycopg2


db_connect = psycopg2.connect(
    dbname="APIDesign", user="postgres", password="Jane1", host="localhost"
)


app = Flask(__name__)


def spcall(query, param, commit=False):
    try:
        cursor = db_connect.cursor()
        cursor.callproc(query, param)
        res = cursor.fetchall()
        if commit:
            db_connect.commit()
        return res
    except:
        res = [("Error: " + str(sys.exc_info()[0])) + ": " + str(sys.exc_info()[1])]


@app.route("/course", methods=["GET"])
def get_courses():
    try:
        courses = spcall("get_courses", param=None)
        return jsonify({"status": "success", "data": courses})
    except Exception as e:
        return jsonify({"status": "fail", "message": str(e)})


@app.route("/")
def hello():
    return "Hello World"


if __name__ == "__main__":
    app.run(debug=True)
