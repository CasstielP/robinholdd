from app.models import db, Transaction, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_transactions():
    transc1 = Transaction(
        user_id=1, stock_symbol='AAPL', quantity=10, is_purchased=True, price=180.12)
    transc2 = Transaction(
        user_id=2, stock_symbol='AAPL', quantity=5, is_purchased=True, price=150.54)
    transc3 = Transaction(
        user_id=3, stock_symbol='AAPL', quantity=6, is_purchased=True, price=160.75)
    transc4 = Transaction(
        user_id=1, stock_symbol='TSLA', quantity=6, is_purchased=True, price=200.19)

    db.session.add(transc1)
    db.session.add(transc2)
    db.session.add(transc3)
    db.session.add(transc4)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_transactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM transactions")

    db.session.commit()
