# Platform Code Test - User Auth 1.0

Project details:
1. AWS-based API using API Gateway, Lambda (nodeJS + TypeScript) with serverless.
2. Database: JSON file



Why severless framework + AWS:

1. Fender uses AWS + Terraform, which is a similar concept with a different execution.
2. Most of my experience is within AWS (Cloudformation, serverless).
3. Serverless allowed allowed me to quickly and easily put together an API that can be run locally and/or dropped into a real-world AWS environment, while also demonstrating my AWS prowess.


Why nodejs + typescript:

1. Typescript adds runtime compiler errors that prevent bugs from ever being deployed in the first place.
2. Classes and other declarations are more broadly supported.
3. Code is self-documenting.
4. Typescript is closer to what I may be working with at Fender (GoLang) than raw nodeJS.


Why a JSON file as a database:

1. Quickest way to get up and running.
2. Running an RDS instance locally proved not to be practical.


To run:

1. Make sure you have nodejs installed
2. cd into 'user-service' folder
3. npm install
4. sls offline

Port: 3000

Endpoints:

1. POST - /dev/user/create
2. GET - /dev/user/{username}
3. POST - /dev/user/{username}
4. DELETE - /dev/user/{username}
5. POST - /dev/user/{username}/login
6. POST - /dev/user/{username}/logout


If I had more time:

1. Move commonly used logic to dedicated modules.
2. Set up a real database.
3. Unit tests.
4. More security around invalid or malicious requests.
5. Implement webpack.
6. Learn GoLang and rewrite the entire thing.