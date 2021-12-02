FROM node:alpine

RUN apk add  --no-cache ffmpeg

EXPOSE 6666

ADD ./scripts /scripts

# force container not to shut-down
CMD ["tail", "-f", "/dev/null"]