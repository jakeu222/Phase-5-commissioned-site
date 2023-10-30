#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, render_template, session
from flask_restful import Resource


# Local imports
from config import app, db, api
# Add your model imports
from models import User, Listing, UserListing, Financing, Event, Agent



@app.route('/')
def index():
    return '<h1>Cindie Perry Real Estate</h1>'
class Login_Route(Resource):
    def post(self):
        data = request.get_json()
        username = data['username']
        password = data['password']

        user = User.query.filter_by(username=username).first()
        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(), 200
            else:
                return {"Error": "Password is incorrect"}, 401
        return {"Error": "User dosen't exist"}, 401 
api.add_resource(Login_Route, '/login')

class Logout_Route(Resource):
    def delete(self):
        session['user_id'] = None
        return {'Message':''}, 204
api.add_resource(Logout_Route, '/logout')

class CheckSession(Resource):
    def get(self):
        user = User.query.filter_by(id=session.get('user_id')).first()
        if user:
            return user.to_dict(), 200
        return {'message': 'Not Authorized'}, 401
api.add_resource(CheckSession, '/check_session')

class Users_Route(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return users, 200
    def post(self):
        data = request.get_json()
        try:
            print(data.get('first_name'))

            new_user = User(
                first_name=request.get_json()['first_name'],
                last_name=request.get_json()['last_name'],
                email=request.get_json()['email'],
                # phone_number=int(request.get_json()['phone_number']),
                age=int(request.get_json()['age']),
                city=request.get_json()['city'],
                username=request.get_json()['username'],
                password_hash=request.get_json()['password'],
                buyer=request.get_json()['buyer']
            )
        except ValueError as e:
            return {"errors": str(e)}, 400
        except TypeError as e:
            return {"errors": str(e)}, 400

            

        db.session.add(new_user)
        db.session.commit()

        return new_user.to_dict(), 200
api.add_resource(Users_Route, '/users')


class UserById_Route(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            return user.to_dict(), 200
        return {"error": "User not found"}, 404
    def patch(self, id):
        user = User.query.filter_by(id=id).first()

        if user:
            dtp = request.get_json()
            errors = []
            for attr in dtp:
                try:
                    setattr(user, attr, dtp[attr])
                except ValueError as e:
                    errors.append(e.__repr__())
            if len(errors) != 0:
                return {"errors": errors}, 400
            else:
                db.session.add(user)
                db.session.commit()
                return user.to_dict(), 202
        
        return {"error": "User not found"}, 404
    
    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            try:
                db.session.delete(user)
                db.session.commit()
                return 'User no more', 204
            except Exception:
                return '', 400
        else:
            return {"error": "User not found"}, 404
api.add_resource(UserById_Route, '/users/<int:id>')

class Listing_Route(Resource):
    def get(self):
        listings = [listing.to_dict() for listing in Listing.query.all()]
        return listings, 200
    def post(self):
        data = request.get_json()
        try:
            # print(data.get('first_name'))

            new_listing = User(
                price=request.get_json()['price'],
                location=request.get_json()['location'],
                description=request.get_json()['description'],
                agent_id=request.get_json()['agent_id'],
                status=request.get_json()['status']
            )
        except ValueError as e:
            return {"errors": str(e)}, 400
        except TypeError as e:
            return {"errors": str(e)}, 400

            

        db.session.add(new_listing)
        db.session.commit()

        return new_listing.to_dict(), 200
api.add_resource(Listing_Route, '/listings')

class ListingById_Route(Resource):
    def get(self, id):
        listing = Listing.query.filter_by(id=id).first()
        if listing:
            return listing.to_dict(), 200
        return {"error": "Quest not found"}, 404
    def patch(self, id):
        listing = Listing.query.filter_by(id=id).first()

        if listing:
            dtp = request.get_json()
            errors = []
            for attr in dtp:
                try:
                    setattr(listing, attr, dtp[attr])
                except ValueError as e:
                    errors.append(e.__repr__())
            if len(errors) != 0:
                return {"errors": errors}, 400
            else:
                db.session.add(listing)
                db.session.commit()
                return listing.to_dict(), 202
        
        return {"error": "Listing not found"}, 404
    
    def delete(self, id):
        listing = Listing.query.filter_by(id=id).first()
        if listing:
            try:
                db.session.delete(listing)
                db.session.commit()
                return 'This quest was deemed to gnarly', 202
            except Exception:
                return 'So gnarly it broke the back', 400
        else:
            return {"error": "Listing not found"}, 404
api.add_resource(ListingById_Route, '/listings/<int:id>')

class UserListing_Route(Resource):
    def get(self):
        userListing = [userListing.to_dict() for userListing in UserListing.query.all()]
        return userListing, 200
    def post(self):
        data = request.get_json()
        try:
            # print(data.get('first_name'))

            new_userListing = UserListing(
                listing_name=request.get_json()['listing_name'],
                user_id=request.get_json()['user_id'],
                listing_id=request.get_json()['listing_id'],
            )
        except ValueError as e:
            return {"errors": str(e)}, 400
        except TypeError as e:
            return {"errors": str(e)}, 400

            

        db.session.add(new_userListing)
        db.session.commit()

        return new_userListing.to_dict(), 200
api.add_resource(UserListing_Route, '/user_listings')

class UserListingById_Route(Resource):
    def get(self, id):
        userListing = UserListing.query.filter_by(id=id).first()
        if userListing:
            return userListing.to_dict(), 200
        return {"error": "Quest not found"}, 404
    def patch(self, id):
        userListing = UserListing.query.filter_by(id=id).first()

        if userListing:
            dtp = request.get_json()
            errors = []
            for attr in dtp:
                try:
                    setattr(userListing, attr, dtp[attr])
                except ValueError as e:
                    errors.append(e.__repr__())
            if len(errors) != 0:
                return {"errors": errors}, 400
            else:
                db.session.add(userListing)
                db.session.commit()
                return userListing.to_dict(), 202
        
        return {"error": "User Listing not found"}, 404
    
    def delete(self, id):
        userListing = UserListing.query.filter_by(id=id).first()
        if userListing:
            try:
                db.session.delete(userListing)
                db.session.commit()
                return 'This quest was deemed to gnarly', 202
            except Exception:
                return 'So gnarly it broke the back', 400
        else:
            return {"error": "Listing not found"}, 404
api.add_resource(UserListingById_Route, '/user_listings/<int:id>')

class Financing_Route(Resource):
    def get(self):
        financing = [finance.to_dict() for finance in Financing.query.all()]
        return financing, 200
    def post(self):
        data = request.get_json()
        try:
            # print(data.get('first_name'))

            new_financing = Financing(
                mortgage_calculation=request.get_json()['mortgage_calculation'],
                user_id=request.get_json()['user_id'],
                listing_id=request.get_json()['listing_id'],
            )
        except ValueError as e:
            return {"errors": str(e)}, 400
        except TypeError as e:
            return {"errors": str(e)}, 400

            

        db.session.add(new_financing)
        db.session.commit()

        return new_financing.to_dict(), 200
api.add_resource(Financing_Route, '/financing')

class FinancingById_Route(Resource):
    def get(self, id):
        financing = Financing.query.filter_by(id=id).first()
        if financing:
            return financing.to_dict(), 200
        return {"error": "Quest not found"}, 404
    def patch(self, id):
        financing = Financing.query.filter_by(id=id).first()

        if financing:
            dtp = request.get_json()
            errors = []
            for attr in dtp:
                try:
                    setattr(financing, attr, dtp[attr])
                except ValueError as e:
                    errors.append(e.__repr__())
            if len(errors) != 0:
                return {"errors": errors}, 400
            else:
                db.session.add(financing)
                db.session.commit()
                return financing.to_dict(), 202
        
        return {"error": "User Listing not found"}, 404
    
    def delete(self, id):
        financing = Financing.query.filter_by(id=id).first()
        if financing:
            try:
                db.session.delete(financing)
                db.session.commit()
                return 'This quest was deemed to gnarly', 202
            except Exception:
                return 'So gnarly it broke the back', 400
        else:
            return {"error": "Listing not found"}, 404
api.add_resource(FinancingById_Route, '/financing/<int:id>')

class Event_Route(Resource):
    def get(self):
        events = [event.to_dict() for event in Event.query.all()]
        return events, 200
    def post(self):
        data = request.get_json()
        try:
            # print(data.get('first_name'))

            new_event = Event(
                event_name=request.get_json()['event_name'],
                location=request.get_json()['location'],
                description=request.get_json()['description'],
            )
        except ValueError as e:
            return {"errors": str(e)}, 400
        except TypeError as e:
            return {"errors": str(e)}, 400

            

        db.session.add(new_event)
        db.session.commit()

        return new_event.to_dict(), 200
api.add_resource(Event_Route, '/events')

class EventById_Route(Resource):
    def get(self, id):
        event = Event.query.filter_by(id=id).first()
        if event:
            return event.to_dict(), 200
        return {"error": "User not found"}, 404
    def patch(self, id):
        event = Event.query.filter_by(id=id).first()

        if event:
            dtp = request.get_json()
            errors = []
            for attr in dtp:
                try:
                    setattr(event, attr, dtp[attr])
                except ValueError as e:
                    errors.append(e.__repr__())
            if len(errors) != 0:
                return {"errors": errors}, 400
            else:
                db.session.add(event)
                db.session.commit()
                return event.to_dict(), 202
        
        return {"error": "User not found"}, 404
    
    def delete(self, id):
        event = Event.query.filter_by(id=id).first()
        if event:
            try:
                db.session.delete(event)
                db.session.commit()
                return 'User no more', 204
            except Exception:
                return '', 400
        else:
            return {"error": "User not found"}, 404
api.add_resource(EventById_Route, '/events/<int:id>')

# Views go here! use either route!
# @app.errorhandler(404)
# def not_found(e):
#     return render_template("index.html")

# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def catch_all(path):
#     return render_template("index.html")

if __name__ == '__main__':
    app.run(port=5555, debug=True)

