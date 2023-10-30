from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
import re

from config import db, bcrypt

# Models go here!
class User(db.Model, SerializerMixin):  
    __tablename__ = 'users_table'

    serialize_rules = ('-password_hash', '-user_listing_rel.user_rel', '-financing_rel.user_rel')
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String,unique=True)
    _password_hash = db.Column(db.String)
    email = db.Column(db.String)
    # phone_number = db.Column(db.Integer)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    buyer =db.Column(db.Boolean)
    age = db.Column(db.Integer)
    city = db.Column(db.String)
    # relationships
    user_listing_rel = db.relationship('UserListing', back_populates = 'user_rel', cascade = 'all, delete-orphan')
    financing_rel = db.relationship('Financing', back_populates = 'user_rel', cascade = 'all, delete-orphan')
    agent_rel = db.relationship('Agent', back_populates='agent_user_rel')
    # password 
    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')
        )
        self._password_hash = password_hash.decode('utf-8')
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash,
            password.encode('utf-8')
        )
    # validations
    @validates('username', 'password_hash', 'first_name','last_name', 'age')
    def validate_null_false(self, key, value):
        if value:
            return value
        return ValueError(f'{key} must have a value')
    
    # @validates('email')
    # def validate_email(self, key, email):
    #     if re.match(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$', email):
    #         return email
    #     raise ValueError('Invalid email format')
    
    @validates('buyer')
    def validate_buyer(self, key, buyer):
        if isinstance(buyer, bool):
            return buyer
        raise ValueError('Buyer status must be a boolean value')

    
   

class Listing(db.Model, SerializerMixin):
    __tablename__ = 'listing_table'

    serialize_rules = ('-user_listing_rel.listing_rel', '-financing_rel.listing_rel')

    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Integer)
    location = db.Column(db.String)
    description = db.Column(db.String)
    agent_id = db.Column(db.Integer,db.ForeignKey('agent_table.id'))
    status = db.Column(db.Integer)
    # relationships
    user_listing_rel = db.relationship('UserListing', back_populates = 'listing_rel', cascade = 'all, delete-orphan')
    financing_rel = db.relationship('Financing', back_populates = 'listing_rel', cascade = 'all, delete-orphan')
    agent_rel = db.relationship('Agent', back_populates='agent_listing_rel', foreign_keys=[agent_id])

    @validates('price')
    def validate_price(self, key, price):
        if price > 0:
            return price
        raise ValueError('Price must be a positive integer')
    
    @validates('status')
    def validate_status(self, key, status):
        STATUS = ['Sold', 'escrow', 'listed', 'foreclosed']
        if status in STATUS:
            return status
        raise ValueError(f'Status must be one of {STATUS}')

  
    
    

    

class UserListing (db.Model, SerializerMixin):  
    __tablename__ = 'user_listing_table'
    
    serialize_rules = ('-listing_rel.user_listing_rel', '-user_rel.user_listing_rel')

    id = db.Column(db.Integer, primary_key=True)
    listing_name = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'))
    listing_id = db.Column(db.Integer, db.ForeignKey('listing_table.id'))
    # relationships
    user_rel = db.relationship('User', back_populates = 'user_listing_rel')
    listing_rel = db.relationship('Listing', back_populates = 'user_listing_rel')

    @validates('listing_name')
    def validate_listing_name(self, key, listing_name):
        if listing_name:
            return listing_name
        raise ValueError('Listing name must have a value')


class Financing (db.Model, SerializerMixin):  
    __tablename__ = 'financing_table'

    serialize_rules = ('-listing_rel.financing_rel', '-user_rel.financing_rel')
    
    id = db.Column(db.Integer, primary_key=True)
    mortgage_calculation = db.Column(db.Float)
    user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'))
    listing_id = db.Column(db.Integer, db.ForeignKey('listing_table.id'))


    # relationships
    user_rel = db.relationship('User', back_populates = 'financing_rel')
    listing_rel = db.relationship('Listing', back_populates = 'financing_rel')

    @validates('mortgage_calculation')
    def validate_mortgage_calculation(self, key, mortgage_calculation):
        if mortgage_calculation > 0:
            return mortgage_calculation
        raise ValueError('Mortgage calculation must be a positive float')

class Event(db.Model, SerializerMixin):
    __tablename__ = 'event_table'

    id = db.Column(db.Integer, primary_key=True)
    event_name = db.Column(db.String)
    location = db.Column(db.String)
    description = db.Column(db.String)
    
    # relationships
    agent_rel = db.relationship('Agent', back_populates='agent_event_rel')

    @validates('event_name')
    def validate_event_name(self, key, event_name):
        if event_name:
            return event_name
        raise ValueError('Event name must have a value')
   
class Agent (db.Model, SerializerMixin):  
    __tablename__ = 'agent_table'
    
    id = db.Column(db.Integer, primary_key=True)
    agent_name = db.Column(db.String)
    agent_location = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'))
    listing_id = db.Column(db.Integer, db.ForeignKey('listing_table.id'))
    event_id = db.Column(db.Integer, db.ForeignKey('event_table.id'))

    # relationships
    agent_user_rel = db.relationship('User', back_populates='agent_rel')
    agent_listing_rel = db.relationship('Listing', back_populates='agent_rel', foreign_keys=[Listing.agent_id])
    agent_event_rel = db.relationship('Event', back_populates='agent_rel')

                        