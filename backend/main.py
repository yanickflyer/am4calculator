from flask import Flask, request, json, jsonify
from jsonschema import validate, ValidationError
from calc import calculations
from flask_cors import CORS

api = Flask(__name__)
CORS(api)

@api.route("/", methods=["GET"])
def hello():
    data = {"message": "Hello World!"}
    return json.dumps(data)

@api.route("/calc", methods=["POST"])
def calc():
    schema = {
        '$schema': 'http://json-schema.org/draft-07/schema#',
        'type': 'object',
        'properties': {
            'plane_eco': {
                'type': 'integer'
            },
            'plane_business': {
                'type': 'integer'
            },
            'plane_first': {
                'type': 'integer'
            },
            'demand_eco': {
                'type': 'integer'
            },
            'demand_business': {
                'type': 'integer'
            },
            'demand_first': {
                'type': 'integer'
            }
        },
        'required': [
            'plane_eco',
            'plane_business',
            'plane_first',
            'demand_eco',
            'demand_business',
            'demand_first'
        ]
    }

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