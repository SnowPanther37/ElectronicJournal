run: 
	sudo docker run -d -p 80:4200 --env-file ./.env --rm --name voodle snowpanther37/voodle
run-dev:
	sudo docker run -d -p 80:4200 -v "/home/snow/Рабочий стол/Project3:/app" -v /app/node_modules --env-file ./.env --rm --name voodle snowpanther37/voodle:latest
stop:
	sudo docker stop voodle


	