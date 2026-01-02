from django.core.management.base import BaseCommand
from django.conf import settings
from djongo import models
from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']

        # Drop collections if they exist
        db.users.drop()
        db.teams.drop()
        db.activities.drop()
        db.leaderboard.drop()
        db.workouts.drop()

        # Create test users (superheroes)
        users = [
            {"name": "Iron Man", "email": "ironman@marvel.com", "team": "Marvel"},
            {"name": "Captain America", "email": "cap@marvel.com", "team": "Marvel"},
            {"name": "Spider-Man", "email": "spiderman@marvel.com", "team": "Marvel"},
            {"name": "Superman", "email": "superman@dc.com", "team": "DC"},
            {"name": "Batman", "email": "batman@dc.com", "team": "DC"},
            {"name": "Wonder Woman", "email": "wonderwoman@dc.com", "team": "DC"},
        ]
        db.users.insert_many(users)
        db.users.create_index([("email", 1)], unique=True)

        # Create teams
        teams = [
            {"name": "Marvel", "members": [u["email"] for u in users if u["team"] == "Marvel"]},
            {"name": "DC", "members": [u["email"] for u in users if u["team"] == "DC"]},
        ]
        db.teams.insert_many(teams)

        # Create activities
        activities = [
            {"user": "ironman@marvel.com", "activity": "Running", "duration": 30},
            {"user": "cap@marvel.com", "activity": "Cycling", "duration": 45},
            {"user": "spiderman@marvel.com", "activity": "Swimming", "duration": 25},
            {"user": "superman@dc.com", "activity": "Flying", "duration": 60},
            {"user": "batman@dc.com", "activity": "Martial Arts", "duration": 40},
            {"user": "wonderwoman@dc.com", "activity": "Weightlifting", "duration": 35},
        ]
        db.activities.insert_many(activities)

        # Create leaderboard
        leaderboard = [
            {"team": "Marvel", "points": 100},
            {"team": "DC", "points": 95},
        ]
        db.leaderboard.insert_many(leaderboard)

        # Create workouts
        workouts = [
            {"user": "ironman@marvel.com", "workout": "Chest Day", "reps": 50},
            {"user": "cap@marvel.com", "workout": "Leg Day", "reps": 60},
            {"user": "spiderman@marvel.com", "workout": "Cardio", "reps": 40},
            {"user": "superman@dc.com", "workout": "Strength", "reps": 70},
            {"user": "batman@dc.com", "workout": "Endurance", "reps": 55},
            {"user": "wonderwoman@dc.com", "workout": "Flexibility", "reps": 45},
        ]
        db.workouts.insert_many(workouts)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data!'))
