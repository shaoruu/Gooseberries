Gooseberries [frontend unfinished]
===
## To set up the backend server:
1. git clone https://github.com/dvfcfbgv/Gooseberries.git
2. cd Gooseberries
3. pip install pipenv==2018.10.13
4. pipenv install --three
## To activate the environment and run the server:
1. cd Gooseberries
2. pipenv shell
3. python manage.py runserver
4. Visit localhost:8000/graphql
## To shut down server and deactivate the environment:
1. ctrl+C to stop the server 
2. use the 'exit' command or ctrl+D to exit the pipenv session
3. to remove the virtualenv: pipenv --rm

