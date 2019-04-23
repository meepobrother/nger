```yml
version: "2"
services:
  nginx: 
    image: nginx
    container_name: nginx
    ports: 
      - 0.0.0.0:80:80
      - 0.0.0.0:81:81
    environment:
      - NGINX_PORT=80
    networks: 
      - app
    volumes: 
      - ./config/nginx/nginx.conf:/etc/nginx/nginx.conf
  mysql:
    image: mysql
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    container_name: mysql
    ports:
      - 0.0.0.0:3306:3306
    environment:
      MYSQL_ROOT_PASSWORD: 123456
      MYSQL_DATABASE: test
    volumes:
      - ./data/mysql:/var/lib/mysql
      - ./config/mysql/my.conf:/etc/mysql/my.cnf
    networks:
      - app
networks:
  app:
    external: true
```