 # Paper Registration Tool for Universities

This repository contains a Paper-Registration Tool for Universities. The way this tool is supposed to work is that Professors can enter their ideas for papers and Students can look at them, filter them, etc.

## Getting Started

### Prerequisites

- Install Docker from [https://www.docker.com/](https://www.docker.com/) if you haven't already.

### Installation

1. Clone this repository to your local machine:
    ```sh
    git clone https://github.com/coSK123/paper-registration.git
    ```

2. Create two `.env` files:
    - One `.env` for the Backend
    - One `.env` in general

    You can find two `env.example` files in the repository:
    - One in the `Backend` folder
    - One in the top-most folder

    Use these to create your own `.env` files by supplying values similar to the example values that you find in those files. There are some overlapping fields in these two files, so make sure that you provide the same values for these fields. Note that you can just copy the contents of the env.example files if you just want to try the tool quickly. Most of the fiels should be self explanatory. ACCESS_TOKEN and REFRESH_TOKEN should be chosen as long randomly generated strings for safety.

### Running the Application

1. Start Docker by opening Docker Desktop or by running the following command in your command line on Windows:
    ```sh
    docker desktop start
    ```

2. Navigate to the project folder and run:
    ```sh
    docker-compose up --build -d
    ```

After doing this, all containers should be running and you can find the web interface at [http://localhost:4100/](http://localhost:4100/). Note that the credentials you defined in the Backend .env will be the only credentials you can log in with at the start.
