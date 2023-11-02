#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc, random

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db,User,Listing,UserListing,Financing,Event,Agent

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Clearing Database...")
        # Seed code goes here!
        User.query.delete()
        # Listing.query.delete()
        # UserListing.query.delete()
        # Financing.query.delete()
        # Event.query.delete()
        # Agent.query.delete()    
        print("Starting seeding...")
        # db.create_all()
        print("Starting seeding of users...")
        for _ in range(10):
            u = User(
                    username = fake.name(),
                    email = fake.email(),
                    password_hash = "123abc!@#", 
                    # phone_number=int(fake.phone_number()) // 1000,
                    first_name=fake.first_name(),
                    last_name=fake.last_name(),
                    age=randint(0, 100),
                    city="denver",
                )
            
            db.session.add(u)
            db.session.commit()
        print('finished users')
        print('starting listings')
        for _ in range (10):
            l = Listing(
                    title = fake.name(),
                    price = randint(0, 1000000),
                    location = 'denver',
                    description = fake.paragraph(nb_sentences=5),
            )
            db.session.add(l)
            db.session.commit()
    