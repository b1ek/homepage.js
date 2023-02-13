FROM node:19

WORKDIR /opt/code

COPY . /opt/code

RUN cat .gitignore | xargs rm -rf && \
    npm i && \
	./install

CMD [ "bash", "-c", "if [[ $APP_DEBUG == 'true' ]]; then npm run dev; else npm run prod; fi" ]
