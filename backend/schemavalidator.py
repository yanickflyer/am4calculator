schema_ratio = {
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