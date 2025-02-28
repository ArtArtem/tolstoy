/*
PostgreSQL Schema

CREATE TABLE videos (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  cloudinary_id TEXT NOT NULL,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

*/