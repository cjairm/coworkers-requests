FROM node:12

WORKDIR /react_project

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /react_project
COPY package-lock.json /react_project
RUN cd /react_project && npm install 

COPY . /react_project

CMD ["npm", "start"]    
