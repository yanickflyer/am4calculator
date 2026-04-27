from flask import Flask, request, json, jsonify
from jsonschema import validate, ValidationError
from calc import calculations
from flask_cors import CORS
import schemavalidator

api = Flask(__name__)
CORS(api)

@api.route("/", methods=["GET"])
def hello():
    data = {"message": "Hello World!"}
    return json.dumps(data)

@api.route("/calc", methods=["POST"])
def calc():
    schema = schemavalidator.schema_ratio

    try:
        data = request.get_json()
        validate(instance=data, schema=schema)
    except ValidationError:
        return json.dumps({"error": "Invalid input"}), 400
    
    calc = calculations(
        data["plane_eco"],
        data["plane_business"],
        data["plane_first"],
        data["demand_eco"],
        data["demand_business"],
        data["demand_first"]
    )

    s = calc.scaling_factor(calc.plane_capacity(), calc.total_demand())
    seating = calc.new_seating(s)

    return jsonify(seating)

if __name__ == "__main__":
    api.run(debug=True, port=5001)