FROM ubuntu

RUN mkdir /app

COPY . /app/

CMD ["bash"]