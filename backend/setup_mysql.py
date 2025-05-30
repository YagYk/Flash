#!/usr/bin/env python3
"""
MySQL Database Setup Script for Flash Notes App
Run this script to create the MySQL database and tables.
"""

import pymysql
import os
from dotenv import load_dotenv
from urllib.parse import quote_plus
from database import engine
import models

load_dotenv()

def create_database():
    """Create the MySQL database if it doesn't exist"""
    
    # Get MySQL connection details
    host = os.getenv("MYSQL_HOST", "localhost")
    port = int(os.getenv("MYSQL_PORT", "3306"))
    user = os.getenv("MYSQL_USER", "root")
    password = os.getenv("MYSQL_PASSWORD", "password")
    database = os.getenv("MYSQL_DATABASE", "flash_notes")
    
    print(f"🔗 Connecting to MySQL at {host}:{port}...")
    
    try:
        # Connect to MySQL server (without specifying database)
        connection = pymysql.connect(
            host=host,
            port=port,
            user=user,
            password=password,
            charset='utf8mb4'
        )
        
        with connection.cursor() as cursor:
            # Create database if it doesn't exist
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS {database} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
            print(f"✅ Database '{database}' created successfully!")
            
        connection.close()
        
    except Exception as e:
        print(f"❌ Error creating database: {e}")
        print("\n📝 Make sure MySQL is running and credentials are correct in .env file")
        return False
    
    return True

def create_tables():
    """Create all tables using SQLAlchemy"""
    try:
        print("🏗️  Creating tables...")
        models.Base.metadata.create_all(bind=engine)
        print("✅ All tables created successfully!")
        return True
    except Exception as e:
        print(f"❌ Error creating tables: {e}")
        return False

def main():
    print("🚀 Flash Notes - MySQL Database Setup")
    print("=" * 40)
    
    # Step 1: Create database
    if not create_database():
        return
    
    # Step 2: Create tables
    if not create_tables():
        return
    
    print("\n🎉 MySQL setup complete!")
    print("📝 Your Flash Notes app is ready to use with MySQL!")
    print("\n📋 Next steps:")
    print("  1. Install dependencies: pip install -r requirements.txt")
    print("  2. Start the server: python -m uvicorn main:app --reload")

if __name__ == "__main__":
    main() 