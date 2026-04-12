class calculations:
    def __init__(self,economy_seats, business_seats, first_class_seats, economy_demand, business_demand, first_class_demand):
        self.economy_seats = economy_seats
        self.business_seats = business_seats
        self.first_class_seats = first_class_seats
        self.economy_demand = economy_demand
        self.business_demand = business_demand
        self.first_class_demand = first_class_demand

    def plane_capacity(self):
        c = self.economy_seats + (self.business_seats * 2) + (self.first_class_seats * 3)
        return c
    
    def total_demand(self):
        d = self.economy_demand + (self.business_demand * 2) + (self.first_class_demand * 3)
        return d
    
    def scaling_factor(self, capacity, demand):
        if demand == 0:
            return 0
        s = capacity / demand
        return s

    def new_seating(self, scaling_factor):
        new_economy = int(self.economy_demand * scaling_factor)
        new_business = int(self.business_demand * scaling_factor)
        new_first_class = int(self.first_class_demand * scaling_factor)
        return {"economy": new_economy, "business": new_business, "first_class": new_first_class}