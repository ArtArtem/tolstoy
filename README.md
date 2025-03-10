Task Overview 

Develop a scalable full-stack web application enabling users to upload videos. Upon upload, the 
backend processes each video to generate a thumbnail. The frontend displays these videos in a 
carousel gallery, showcasing the generated thumbnails. 

Requirements 

Frontend 
1. Video Upload Interface: 
  ○ Create a user-friendly interface allowing users to select and upload multiple video 
  files simultaneously. Display upload and processing progress bars to enhance 
  user experience. 
2. Video Gallery Carousel: 
  ○ Present generated thumbnails in a responsive carousel layout. Enable users to 
  click on a thumbnail to play the corresponding video within the carousel. 

Backend 
1. Video Processing: 
  ○ Extract a frame upon receiving a video upload. Save uploaded videos and their 
  corresponding thumbnails to a designated storage solution (Vercel Blob storage). 
2. API Endpoints: 
  ○ Upload Endpoint: Handle POST requests for video uploads, process videos to 
  generate thumbnails, and return URLs of stored files. 
  ○ Gallery Endpoint: Provide metadata for all uploaded videos, including thumbnail 
  URLs, for frontend display. 
