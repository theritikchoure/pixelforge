# PixelForge

![PixelForge Logo](./client/src/app/favicon-modified.png)

**PixelForge** is a web-based tool designed to simplify image conversion and manipulation. With support for various file formats, it enables users to upload, convert, and customize images with ease. The tool handles complex operations such as format conversion, resizing, rotation, flipping, and more, all while maintaining high performance using asynchronous processing and Redis-based worker queues for scalability.

## Features

- **Drag and Drop Image Upload**: Simplify file selection with a drag-and-drop interface.
- **Multiple Image Format Support**: Convert images to/from popular formats like JPG, PNG, TIFF, WebP, GIF, and more.
- **Image Manipulation**: Rotate, flip, and resize images before converting.
- **Rate-Limiting**: Limit usage per user with token-based API access for registered users and daily limits for guests.
- **Scalable**: Utilizes Redis-based worker queues for asynchronous processing, making it highly scalable under heavy traffic.
- **Real-Time Feedback**: Display conversion progress and downloadable files with an intuitive UI.

<!-- ## Demo

You can check the live demo [here](https://your-demo-url.com). -->

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Running the Application](#running-the-application)
  - [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

---

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js** (version 14.x or later)
- **Redis** (for the worker queue)
- **MongoDB** (optional, depending on user authentication system)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/theritikchoure/pixelforge.git
    cd pixelforge
    ```

2. Install dependencies for both the server and client:

    - Navigate to the `server` directory and install the backend dependencies:
        ```bash
        cd server
        npm install
        ```

    - Navigate to the `client` directory and install the frontend dependencies:
        ```
        cd ../client
        npm install
        ```

3. Set up the environment variables in `server` directory by creating a `.env` file:

    ```bash
    touch .env
    ```

    Populate it with the following details:

    ```
    PORT=3001
    MONGO_URI=mongodb://localhost:27017/pixelforge
    REDIS_URL=redis://localhost:6379
    JWT_SECRET=your_jwt_secret
    DAILY_LIMIT=5
    REGISTERED_USER_LIMIT=500
    ```

4. Start the Redis server locally (if not already running):

    ```bash
    redis-server
    ```

## Usage

### Running the Application

1. Start the backend server:

    ```bash
    cd server
    npm start
    ```

    The app will be running on `http://localhost:3001`.

2. Start the frontend server:

    ```bash
    cd client
    npm start
    ```

    The app will be running on `http://localhost:3000`.

### API Endpoints

- **POST** `/convert`
  
  Converts an uploaded image based on user-selected options (format, rotation, etc.).

  - **Request Body**:
  
    - `file`: The image to be uploaded (multipart form data).
    - `conversionType`: The target format (e.g., `png`, `jpg`, `webp`).
    - `rotate`: Rotation angle (optional).
    - `flip`: Whether to flip the image horizontally (optional).
  
  - **Response**: Converted image file in the selected format.

## Example

```bash
curl -X POST http://localhost:3001/convert \
-F 'file=@path/to/your/image.png' \
-F 'conversionType=jpg' \
-F 'rotate=90' \
-F 'flip=true'
```

### Technologies Used

- Frontend:
    - Next.js
    - Tailwind CSS

- Backend:
    - Node.js
    - Express.js
    - Sharp (for image manipulation)
    - Multer (for file uploads)
    - Redis + Bull (for queue management)
    - MongoDB (for user authentication and tracking)

- Other:
    - Axios (for HTTP requests)

## Rate Limiting

- **Guests:** Can process up to 5 images per day.

- **Registered Users:** Can process up to 500 images per day. Requires API token.

    Example API Request with Token:
    ```
    curl -X POST http://localhost:3001/convert \
    -H "Authorization: Bearer your_token_here" \
    -F 'file=@path/to/your/image.png' \
    -F 'conversionType=jpg'
    ```

## Scaling the Application
PixelForge is designed to handle a large volume of requests using Redis-based queues. Here’s how the queue system works:

1. **Worker Queue:** The backend offloads image processing tasks to a Redis-based Bull queue. Each image conversion task is processed asynchronously by worker nodes.

2. **Horizontal Scaling:** The worker nodes can be scaled horizontally to handle increased load.

## Contributing
We welcome contributions from the community!

- Fork the repository.
- Create a feature branch.
- Commit your changes.
- Open a pull request.

Make sure to follow our contributing guidelines for more details.

## License
This project is licensed under the MIT License - see the LICENSE file for details.