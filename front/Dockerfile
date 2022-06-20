FROM nginx:1.18

#install packages
RUN apt-get update && apt-get install -y \
  vim \
  iputils-ping

## Copy our default nginx config
## COPY extra-data/nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

COPY ./build/ /usr/share/nginx/html/