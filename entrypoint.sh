#!/bin/sh

sed -i 's,BASE_API_URL,'"$BASE_API_URL"',g' /usr/share/nginx/html/*

nginx -g 'daemon off;'
