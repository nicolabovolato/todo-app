import os, subprocess
import uuid
import re

api_subdomain             = str(uuid.uuid1())
app_name                  = 'todo_app'
ltapi_container_name      = 'lt-api'
ltfrontend_container_name = 'lt-frontend'
frontend_container_name   = 'frontend'
compose_args              = f'-p {app_name}'

def error(msg: str):
  print(msg)
  subprocess.check_call(['docker-compose', compose_args, 'down'], stdout=subprocess.STDOUT, stderr=subprocess.STDOUT)
  quit()

def find_url(str: str):
  return re.search('(?P<url>https?://[^\s]+)', str).group('url')

# change working directory to this file's path
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# set the subdomain env var
os.environ['API_SUBDOMAIN'] = api_subdomain

# tell the frontend we are using localtunnel
os.environ['USE_LOCALTUNNEL'] = 'true'

# stop the services
print('Stopping services...')
subprocess.check_call(['docker-compose', compose_args, 'down'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

# rebuild the frontend image
print('Rebuilding frontend image...')
subprocess.check_call(['docker-compose', compose_args, 'build', frontend_container_name], stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)

# restart the services
print('Restarting services...')
subprocess.check_call(['docker-compose', compose_args, 'up', '-d'], stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)

# check if the subdomain is in the localtunnel container logs
ltapi_logs = subprocess.check_output(['docker-compose', compose_args, 'logs', ltapi_container_name])
if(api_subdomain not in ltapi_logs.decode('UTF-8')):
  error('Wrong api domain found, run again the script')

# get the web app url and print it
ltfrontend_logs = subprocess.check_output(['docker-compose', compose_args, 'logs', ltfrontend_container_name])
print('App url: ' + find_url(ltfrontend_logs.decode('UTF-8')))
